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
import { MatDialog } from '@angular/material/dialog';
import { SaveChoreographyDialogComponent } from '../frame-manager/save-choreography-dialog/save-choreography-dialog.component';
import { LoadChoreographyDialogComponent } from '../frame-manager/load-choreography-dialog/load-choreography-dialog.component';
import { filter, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface FrameForShowing extends Frame {
  originalFrameIndex: number;
  isActualFrame: boolean;
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
  frameInterval = 10000;
  areAnimationsOn = true;
  isLoopingOn = true;
  isVoiceSynthesisOn = false;
  tempo = 8;
  areNotesShown = false;
  availableGroupTypes = availableGroupTypes;
  positionOptions: Position[] = ['left', 'center', 'right'];
  actualActiveFrameIndex = 0;
  waitForDurationBeforeChangingFrames: number | null = null;

  get activeFrame(): Frame {
    return this.choreography.frames[this.activeFrameIndex];
  }

  get localStorageEmpty(): any {
    return localStorage.getItem('choreography') === null;
  }

  constructor(
    public choreographyService: ChoreographyService,
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private toastService: ToastService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.choreographyService
      .getChoreographiesById(id)
      .pipe(
        filter((queryOutput) => queryOutput.status === 'success'),
        map((queryOutput) => queryOutput.data!)
      )
      .subscribe((choreography) => (this.choreography = choreography));
  }

  addContentFrame(name: string): void {
    const newContentFrame = {
      ...createDeepCopy(
        this.choreography.frames[this.choreography.frames.length - 1]
      ),
      notes: '',
      type: 'content',
      name,
    };
    this.choreography.frames = [...this.choreography.frames, newContentFrame];
    this.activeFrameIndex++;
  }

  addTransitionFrame(): void {
    const newTransitionFrame = {
      ...createDeepCopy(
        this.choreography.frames[this.choreography.frames.length - 1]
      ),
      notes: '',
      type: 'transition',
      name: '',
    };
    this.choreography.frames = [
      ...this.choreography.frames,
      newTransitionFrame,
    ];
    this.activeFrameIndex++;
  }

  removeFrame(index: number): void {
    const newFrames = createDeepCopy(this.choreography.frames);
    newFrames.splice(index, 1);
    if (this.activeFrameIndex >= newFrames.length) {
      this.activeFrameIndex = newFrames.length - 1;
    }
    this.choreography.frames = newFrames;
  }

  get allAvailablePeople(): Person[] {
    return this.choreography.people.map(
      (choreographyPerson) => choreographyPerson.person
    );
  }

  isPerson(content: Content): content is PersonContent {
    return isPerson(content);
  }

  swapItems({ first, second }: { first: number; second: number }): void {
    const frame = this.choreography.frames[this.activeFrameIndex];
    this.disableAnimationsForNextTick();
    const temp = createDeepCopy(frame.grid[first]);
    frame.grid[first] = createDeepCopy(frame.grid[second]);
    frame.grid[second] = temp;
  }

  play(): void {
    this.activeChoreographyItem = null;
    this.playFrameIntervalId = window.setInterval(() => {
      this.actualActiveFrameIndex =
        (this.actualActiveFrameIndex + 1) %
        this.choreography.frames.reduce(
          (acc, frame) => acc + frame.duration,
          0
        );
      if (
        this.activeFrame.type === 'content' &&
        this.activeFrame.duration === 1
      ) {
        this.activeFrameIndex =
          (this.activeFrameIndex + 1) % this.choreography.frames.length;
        this.waitForDurationBeforeChangingFrames = null;
        return;
      } else if (this.activeFrame.type === 'transition') {
        if (this.waitForDurationBeforeChangingFrames === null) {
          this.waitForDurationBeforeChangingFrames = 1;
        } else {
          if (
            this.waitForDurationBeforeChangingFrames ===
            this.activeFrame.duration
          ) {
            this.activeFrameIndex =
              (this.activeFrameIndex + 1) % this.choreography.frames.length;
            if (this.activeFrame.duration === 1) {
              // setTimeout is needed in order to set the starting transition item first and then start the transition to the next one
              setTimeout(
                () =>
                  (this.activeFrameIndex =
                    (this.activeFrameIndex + 1) %
                    this.choreography.frames.length),
                0
              );
              this.waitForDurationBeforeChangingFrames = null;
            } else {
              this.waitForDurationBeforeChangingFrames = 2;
            }
          } else {
            this.waitForDurationBeforeChangingFrames++;
          }
        }
      } else if (
        this.activeFrame.type === 'content' &&
        this.activeFrame.duration !== 1
      ) {
        if (this.waitForDurationBeforeChangingFrames === null) {
          this.waitForDurationBeforeChangingFrames = 2;
        } else {
          if (
            this.waitForDurationBeforeChangingFrames ===
            this.activeFrame.duration
          ) {
            this.activeFrameIndex =
              (this.activeFrameIndex + 1) % this.choreography.frames.length;
            this.waitForDurationBeforeChangingFrames = null;
          } else {
            this.waitForDurationBeforeChangingFrames++;
          }
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

  setPositionForItem(
    activeChoreographyItem: ChoreographyItem,
    position: Position
  ): void {
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
    this.choreography.frames[frameIndexes[1]] =
      this.choreography.frames[frameIndexes[0]];
    this.choreography.frames[frameIndexes[0]] = temp1;
  }

  logGridToConsole(): void {
    console.log(JSON.stringify(this.choreography.frames));
  }

  changeCarpetHeight(newHeight: number): void {
    this.choreography.carpet = {
      ...this.choreography.carpet,
      height: newHeight,
    };
  }

  changeCarpetVerticalSegments(newVerticalSegments: number): void {
    this.choreography.carpet = {
      ...this.choreography.carpet,
      verticalSegments: newVerticalSegments,
    };
  }

  changeCarpetWidth(newWidth: number): void {
    this.choreography.carpet = { ...this.choreography.carpet, width: newWidth };
  }

  changeCarpetHorizontalSegments(newHorizontalSegments: number): void {
    this.choreography.carpet = {
      ...this.choreography.carpet,
      horizontalSegments: newHorizontalSegments,
    };
  }

  removeExistingPersonFromCarpet(personId: number): void {
    const tile = this.choreography.frames[this.activeFrameIndex].grid.find(
      (item) => getPeopleForContent(item.content).includes(personId)
    );
    if (typeof tile === 'undefined') {
      return;
    } else if (isPerson(tile.content)) {
      this.clearItem(tile);
    } else if (isGroup(tile.content)) {
      removePersonFromGroup(tile.content, personId);
    }
  }

  removePerson(person: Person): void {
    const index = this.choreography.people
      .map((choreographyPerson) => choreographyPerson.person)
      .indexOf(person);
    if (index === -1) {
      throw new Error(
        `The person ${person.name} to be deleted is not present in the people list of the choreography.`
      );
    }
    this.choreography.people.splice(index, 1);
    this.choreography.frames.forEach((frame) =>
      frame.grid.forEach((item) => {
        if (isPerson(item.content) && item.content.personId === person.id) {
          this.clearItem(item);
        } else if (isGroup(item.content)) {
          removePersonFromGroup(item.content, person.id);
        }
      })
    );
    this.toastService.createToastRaw(
      `${this.translate.instant('PEOPLE.PERSON_REMOVED')}: ${person.name}`
    );
  }

  addPerson(person: Person): void {
    this.choreography.people.push({
      person: person,
      color: null,
    });
  }

  changeGroupColor(color: string): void {
    if (
      this.activeChoreographyItem === null ||
      !isGroup(this.activeChoreographyItem!.content)
    ) {
      return;
    }
    this.activeChoreographyItem.content.color = color;
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

  saveChoreography(): void {
    const dialogRef = this.dialog.open(SaveChoreographyDialogComponent, {});
    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        localStorage.setItem('choreography', JSON.stringify(this.choreography));
        this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_SAVED');
      });
  }

  loadChoreography(): void {
    const dialogRef = this.dialog.open(LoadChoreographyDialogComponent, {});
    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        const loadedChoreography = localStorage.getItem('choreography');
        if (loadedChoreography === null) {
          this.toastService.createToast(
            'FRAME_MANAGER.NO_CHOREOGRAPHIES_IN_STORAGE'
          );
          return;
        }
        this.choreography = JSON.parse(loadedChoreography);
        this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_LOADED');
      });
  }

  copyFrameFromPreviousFrame(): void {
    this.choreography.frames[this.activeFrameIndex].grid = createDeepCopy(
      this.choreography.frames[this.activeFrameIndex - 1]
    ).grid;
  }

  moveFrameUpOrDown(direction: 'up' | 'down'): void {
    const newFrames = createDeepCopy(this.choreography.frames);
    if (direction === 'up') {
      const previousFrame = this.choreography.frames[this.activeFrameIndex - 1];
      newFrames[this.activeFrameIndex - 1] =
        this.choreography.frames[this.activeFrameIndex];
      newFrames[this.activeFrameIndex] = previousFrame;
      this.activeFrameIndex--;
    } else if (direction === 'down') {
      const nextFrame = this.choreography.frames[this.activeFrameIndex + 1];
      newFrames[this.activeFrameIndex + 1] =
        this.choreography.frames[this.activeFrameIndex];
      newFrames[this.activeFrameIndex] = nextFrame;
      this.activeFrameIndex++;
    }
    this.choreography.frames = newFrames;
  }

  changeActiveFrame(selectedFrameIndex: number[]): void {
    this.activeFrameIndex = selectedFrameIndex[0];
    this.actualActiveFrameIndex = selectedFrameIndex[1];
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

  private disableAnimationsForNextTick(): void {
    const wereAnimationsOnInitially = this.areAnimationsOn;
    this.areAnimationsOn = false;
    setTimeout(() => (this.areAnimationsOn = wereAnimationsOnInitially), 0);
  }

  changeFrameName(name: string): void {
    const newFrames = createDeepCopy(this.choreography.frames);
    newFrames[this.activeFrameIndex].name = name;
    this.choreography.frames = newFrames;
  }

  changeFrameDuration(duration: number): void {
    const newFrames = createDeepCopy(this.choreography.frames);
    newFrames[this.activeFrameIndex].duration = duration;
    this.choreography.frames = newFrames;
  }

  changePersonOnCarpet(id: number): void {
    this.removeExistingPersonFromCarpet(id);
    this.activeChoreographyItem!.content = { type: 'person', personId: id };
  }

  changePersonOnGroup(id: number): void {
    this.removeExistingPersonFromCarpet(id);
  }

  setActiveChoreographyItem(item: ChoreographyItem): void {
    if (this.playFrameIntervalId !== null) {
      return;
    }
    this.activeChoreographyItem = item;
  }

  saveToDatabase(): void {
    const dialogRef = this.dialog.open(SaveChoreographyDialogComponent, {});
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result !== true),
        switchMap(() => {
          return this.http.post<Partial<Choreography>>(`/api/choreographies`, {
            name: this.choreography.name,
            frames: this.choreography.frames,
            carpet: this.choreography.carpet,
            people: this.choreography.people,
            team: this.choreography.team,
          });
        })
      )
      .subscribe(() =>
        this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_SAVED')
      );
  }
}
