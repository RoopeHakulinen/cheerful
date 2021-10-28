import { Component } from '@angular/core';
import { Choreography, createDeepCopy } from '../choreography';
import {
  ChoreographyItem,
  clearItem,
  Content,
  getPeopleForContent,
  PersonContent,
  Position,
} from '../choreography-item';
import {
  availableGroupTypes,
  ChoreographyGroup,
  createEmptyGroup,
  FiveGroup,
  FourGroup,
  GroupType,
  isFiveGroup,
  isFourGroup,
  isGroup,
  isPerson,
  isThreeGroup,
  isTwoGroup,
  removePersonFromGroup,
  ThreeGroup,
  TwoGroup,
} from '../choreography-group';
import { ChoreographyService } from '../choreography.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../people';
import { PeopleService } from '../people.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../toast.service';
import { Frame } from '../frame';


export interface FrameForShowing extends Frame {
  originalFrameIndex: number;
  isActualFrame: boolean;
}

function buildFramesToShow(frames: Frame[], chunkSize: number): FrameForShowing[][] {
  if (chunkSize <= 0) {
    throw 'Invalid chunk size';
  }
  const result = [];
  let index = 0;
  const artificialFrames = frames.map(frame => {
    const originalIndex = index;
    index++;
    return Array.from(Array(frame.duration)).map((_, durationIndex) => {
      return { ...frame, originalFrameIndex: originalIndex, isActualFrame: durationIndex === 0 };
    });
  }).flat();
  for (let i = 0; i < artificialFrames.length; i += chunkSize) {
    result.push(artificialFrames.slice(i, i + chunkSize));
  }
  return result;
}

@Component({
  selector: 'app-choreography',
  templateUrl: './choreography.component.html',
  styleUrls: ['./choreography.component.scss'],
})
export class ChoreographyComponent {
  choreography!: Choreography;
  activeFrameIndex = 0;
  activeChoreographyItem: ChoreographyItem | null = null;
  playFrameIntervalId: number | null = null;
  frameInterval = 3333;
  areAnimationsOn = true;
  isLoopingOn = true;
  isVoiceSynthesisOn = false;
  tempo = 8;
  areNotesShown = false;
  availableGroupTypes = availableGroupTypes;
  positionOptions: Position[] = ['left', 'center', 'right'];
  private transitionFrameDurationCounter: number | null = null;

  get cycleNumber(): number {
    return this.framesToShow.findIndex(frame => frame.some(frame => frame.originalFrameIndex === this.activeFrameIndex));
  }

  get activeFrame(): Frame {
    return this.choreography.frames[this.activeFrameIndex];
  }

  get framesToShow(): FrameForShowing[][] {
    return buildFramesToShow(this.choreography.frames, this.tempo);
  }

  get localStorageEmpty(): any {
    return localStorage.getItem('choreography') === null;
  }

  constructor(public choreographyService: ChoreographyService, private route: ActivatedRoute,
              private peopleService: PeopleService, private toastService: ToastService,
              private translate: TranslateService) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.choreographyService.getChoreographiesById(id).subscribe(choreography => this.choreography = choreography);
  }

  addContentFrame(name: string): void {
    this.choreography.frames.push({
      ...createDeepCopy(this.choreography.frames[this.choreography.frames.length - 1]),
      notes: '',
      type: 'content',
      name,
    });
    this.activeFrameIndex++;
  }

  addTransitionFrame(): void {
    this.choreography.frames.push({
      ...createDeepCopy(this.choreography.frames[this.choreography.frames.length - 1]),
      notes: '',
      type: 'transition',
      name: '',
    });
    this.activeFrameIndex++;
  }

  removeFrame(index: number): void {
    this.choreography.frames.splice(index, 1);
    if (this.activeFrameIndex >= this.choreography.frames.length) {
      this.activeFrameIndex = this.choreography.frames.length - 1;
    }
  }

  get allAvailablePeople(): Person[] {
    return this.peopleService.getPeopleForChoreography(this.choreography.id);
  }

  get availablePeople(): number[] {
    if (this.activeChoreographyItem?.content === null || isGroup(this.activeChoreographyItem?.content!)) {
      return this.getAvailablePeopleForThisFrame();
    }
    return [...this.getAvailablePeopleForThisFrame(), this.activeChoreographyItem?.content.personId!];
  }

  isPerson(content: Content): content is PersonContent {
    return isPerson(content);
  }

  swapItems({ first, second }: { first: number, second: number }): void {
    const frame = this.choreography.frames[this.activeFrameIndex];
    this.disableAnimationsForNextTick();
    const temp = createDeepCopy(frame.grid[first]);
    frame.grid[first] = createDeepCopy(frame.grid[second]);
    frame.grid[second] = temp;
  }

  play(): void {
    this.playFrameIntervalId = window.setInterval(() => {
      if (this.activeFrame.type === 'content') {
        this.activeFrameIndex = (this.activeFrameIndex + 1) % this.choreography.frames.length;
        return;
      }

      if (this.transitionFrameDurationCounter === null) {
        this.transitionFrameDurationCounter = 1;
      } else {
        if (this.transitionFrameDurationCounter === this.activeFrame.duration) {
          this.activeFrameIndex = (this.activeFrameIndex + 1) % this.choreography.frames.length;
          this.transitionFrameDurationCounter = null;
        } else {
          this.transitionFrameDurationCounter++;
        }
      }
    }, this.frameInterval / this.tempo);
  }

  pause(): void {
    if (this.playFrameIntervalId === null) {
      return;
    }
    window.clearInterval(this.playFrameIntervalId);
    this.playFrameIntervalId = null;
  }

  isGroup(content: Content): content is ChoreographyGroup {
    return isGroup(content);
  }

  setPositionForItem(activeChoreographyItem: ChoreographyItem, position: Position): void {
    activeChoreographyItem.position = position;
  }

  toggleAnimations(): void {
    this.areAnimationsOn = !this.areAnimationsOn;
  }

  toggleLooping(): void {
    this.isLoopingOn = !this.isLoopingOn;
  }

  frameDurationChange(newFrameInterval: number): void {
    this.frameInterval = newFrameInterval;
  }

  toggleVoiceSynthesis(): void {
    this.isVoiceSynthesisOn = !this.isVoiceSynthesisOn;
  }

  switchFramePosition(frameIndexes: number[]): void {
    const temp1 = this.choreography.frames[frameIndexes[1]];
    this.choreography.frames[frameIndexes[1]] = this.choreography.frames[frameIndexes[0]];
    this.choreography.frames[frameIndexes[0]] = temp1;
  }

  logGridToConsole(): void {
    console.log(JSON.stringify(this.choreography.frames));
  }

  private disableAnimationsForNextTick(): void {
    const wereAnimationsOnInitially = this.areAnimationsOn;
    this.areAnimationsOn = false;
    setTimeout(() => this.areAnimationsOn = wereAnimationsOnInitially, 0);
  }

  changeCarpetHeight(newHeight: number): void {
    this.choreography.carpet = { ...this.choreography.carpet, height: newHeight };
  }

  changeCarpetWidth(newWidth: number): void {
    this.choreography.carpet = { ...this.choreography.carpet, width: newWidth };
  }

  changeCarpetVerticalSegments(newVerticalSegments: number): void {
    this.choreography.carpet = { ...this.choreography.carpet, verticalSegments: newVerticalSegments };
  }

  changeCarpetHorizontalSegments(newHorizontalSegments: number): void {
    this.choreography.carpet = { ...this.choreography.carpet, horizontalSegments: newHorizontalSegments };
  }

  removePersonFromCarpet(index: number): void {
    const frame = this.choreography.frames[this.activeFrameIndex];
    this.clearItem(frame.grid[index]);
  }

  getAvailablePeopleForThisFrame(): number[] {
    const frame = this.choreography.frames[this.activeFrameIndex];
    const getPeopleCurrentlyInChoreography = frame.grid
      .reduce(
        (acc, tile) => [
          ...acc,
          ...getPeopleForContent(tile.content),
        ], [] as number[]);

    return this.choreography.people
      .map(person => person.personId)
      .filter(personId => !getPeopleCurrentlyInChoreography.includes(personId));
  }

  addPerson(personId: number): void {
    this.choreography.people.push({ personId: personId, color: null });
  }

  removePerson(personId: number): void {
    const index = this.choreography.people.map(person => person.personId).indexOf(personId);
    if (index === -1) {
      throw new Error(`The person with id ${personId} to be deleted is not present in the people list of the choreography.`);
    }
    this.choreography.people.splice(index, 1);
    this.choreography.frames
      .forEach(frame => frame.grid
        .forEach(item => {
          if (isPerson(item.content) && item.content.personId === personId) {
            this.clearItem(item);
          } else if (isGroup(item.content)) {
            removePersonFromGroup(item.content, personId);
          }
        }),
      );
    this.toastService.createToastRaw(`${this.translate.instant('PEOPLE.PERSON_REMOVED')}: ${this.peopleService.getPersonById(personId).name}`);
  }

  clearItem(item: ChoreographyItem): void {
    clearItem(item);
  }

  switchGroupType(groupType: GroupType): void {
    this.activeChoreographyItem!.content = createEmptyGroup(groupType);
  }

  toggleBetweenGroupAndSingleMode(): void {
    if (this.activeChoreographyItem === null) {
      return;
    }

    if (this.isGroup(this.activeChoreographyItem.content)) {
      this.activeChoreographyItem!.content = null;
    } else {
      this.activeChoreographyItem!.content = createEmptyGroup('two');
    }
  }

  isTwoGroup(content: Content): content is TwoGroup {
    return isTwoGroup(content);
  }

  isThreeGroup(content: Content): content is ThreeGroup {
    return isThreeGroup(content);
  }

  isFourGroup(content: Content): content is FourGroup {
    return isFourGroup(content);
  }

  isFiveGroup(content: Content): content is FiveGroup {
    return isFiveGroup(content);
  }

  changeGroupColor(color: string): void {
    if (this.activeChoreographyItem === null || !isGroup(this.activeChoreographyItem!.content)) {
      return;
    }
    this.activeChoreographyItem.content.color = color;
  }

  saveChoreography(): void {
    localStorage.setItem('choreography', JSON.stringify(this.choreography));
  }

  loadChoreography(): void {
    const loadedChoreography = localStorage.getItem('choreography');
    if (loadedChoreography === null) {
      return;
    }
    this.choreography = JSON.parse(loadedChoreography);
  }

  copyFrameFromPreviousFrame(): void {
    this.choreography.frames[this.activeFrameIndex] = createDeepCopy(this.choreography.frames[this.activeFrameIndex - 1]);
  }

  changeActiveFrame(selectedFrameIndex: number): void {
    this.activeFrameIndex = selectedFrameIndex;
  }

  exportAsJson(): void {
    const data = JSON.stringify(this.choreography);
    const fileName = `choreography-${this.choreography.name}.json`;
    const file = new Blob([data]);
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  onFileSelected(file: any): void {
    if (file.target === null) {
      return;
    }
    const jsonFile = file.target.files[0];
    if (file.target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader = new FileReader();
    reader.readAsText(jsonFile);
    reader.onload = (_: any) => {
      if (typeof reader.result === 'string') {
        this.choreography = JSON.parse(reader.result);
      } else {
        throw new Error('Invalid file!');
      }
    };
  }
}
