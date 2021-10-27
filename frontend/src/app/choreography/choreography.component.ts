import { Component } from '@angular/core';
import { Choreography, createDeepCopy } from '../choreography';
import {
  ChoreographyItem,
  clearItem,
  Content,
  getPeopleForContent,
  PersonContent,
  Position
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
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-choreography',
  templateUrl: './choreography.component.html',
  styleUrls: ['./choreography.component.scss']
})
export class ChoreographyComponent {
  choreography!: Choreography;
  activeFrame = 0;
  activeSubframe = 0;
  activeChoreographyItem: ChoreographyItem | null = null;
  playSubframeIntervalId: number | null = null;
  frameInterval = 3333;
  areAnimationsOn = true;
  isLoopingOn = true;
  isVoiceSynthesisOn = false;
  tempo = 8;
  areNotesShown = false;
  availableGroupTypes = availableGroupTypes;
  positionOptions: Position[] = ['left', 'center', 'right'];

  get localStorageEmpty(): any {
    return localStorage.getItem('choreography') === null;
  }

  constructor(public choreographyService: ChoreographyService, private route: ActivatedRoute,
              private peopleService: PeopleService, private popupService: PopupService,
              private translate: TranslateService) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.choreographyService.getChoreographiesById(id).subscribe(choreography => this.choreography = choreography);
  }

  addFrame(): void {
    this.choreography.frames.push({
      subframes: createDeepCopy(this.choreography.frames[this.choreography.frames.length - 1].subframes),
      notes: ''
    });
    this.activeFrame = this.choreography.frames.length - 1;
    this.activeSubframe = 0;
  }

  removeFrame(index: number): void {
    this.choreography.frames.splice(index, 1);
    if (this.activeFrame >= this.choreography.frames.length) {
      this.activeFrame = this.choreography.frames.length - 1;
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
    this.disableAnimationsForNextTick();
    const temp = createDeepCopy(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[first]);
    const temp2 = createDeepCopy(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[second]);
    this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[first] = temp2;
    this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[second] = temp;
  }

  play(): void {
    this.playSubframeIntervalId = window.setInterval(() => {
      if (this.activeSubframe + 1 === this.choreography.frames[this.activeFrame].subframes.length) {
        this.activeFrame = (this.activeFrame + 1) % this.choreography.frames.length;
      }
      this.activeSubframe = (this.activeSubframe + 1) % this.choreography.frames[this.activeFrame].subframes.length;
    }, this.frameInterval / this.tempo);
  }

  pause(): void {
    if (this.playSubframeIntervalId === null) {
      return;
    }
    window.clearInterval(this.playSubframeIntervalId);
    this.playSubframeIntervalId = null;
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
    this.clearItem(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[index]);
  }

  getAvailablePeopleForThisFrame(): number[] {
    const getPeopleCurrentlyInChoreography = this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid
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
      .forEach(frame => frame.subframes
        .forEach(subframe => subframe.grid
          .forEach(item => {
            if (isPerson(item.content) && item.content.personId === personId) {
              this.clearItem(item);
            } else if (isGroup(item.content)) {
              removePersonFromGroup(item.content, personId);
            }
          }),
        ),
      );
    this.popupService.createToastRaw(`${this.translate.instant('PEOPLE.PERSON_REMOVED')}: ${this.peopleService.getPersonById(personId).name}`);
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

  copySubframeFromPreviousSubframe(): void {
    if (this.activeSubframe === 0) {
      this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid =
        createDeepCopy(this.choreography.frames[this.activeFrame - 1].subframes[7].grid);
    } else {
      this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid
        = createDeepCopy(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe - 1].grid);
    }
  }

  changeActiveFrame(selectedFrameNumber: number): void {
    if (this.activeFrame === selectedFrameNumber) {
      return;
    }
    this.activeFrame = selectedFrameNumber;
    this.activeSubframe = 0;
  }

  exportAsJson(): void {
    const data = JSON.stringify(this.choreography);
    const fileName = `choreography-${this.choreography.name}.json`;
    const file = new Blob([data]);
    const a = document.createElement('a'),
      url = URL.createObjectURL(file);
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
