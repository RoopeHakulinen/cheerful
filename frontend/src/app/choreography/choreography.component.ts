import { Component } from '@angular/core';
import { Choreography, createEmptyFrame } from '../choreography';
import { ChoreographyItem, Content, getPeopleForContent, PersonContent } from '../choreography-item';
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
import { Person } from '../person';
import { PeopleService } from '../people.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../toast.service';
import { Frame } from '../frame';
import { MatDialog } from '@angular/material/dialog';
import { NewContentFrameEvent } from '../frame-manager/frame-manager.component';
import { createDeepCopy } from '../utils';
import { SaveChoreographyDialogComponent } from '../frame-manager/save-choreography-dialog/save-choreography-dialog.component';
import { filter } from 'rxjs';
import { EditNameDialogComponent } from '../edit-name-dialog/edit-name-dialog.component';

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
  activeChoreographyItems: ChoreographyItem[] = [];
  playFrameIntervalId: number | null = null;
  frameInterval = 10000;
  areAnimationsOn = true;
  isLoopingOn = true;
  isVoiceSynthesisOn = false;
  tempo = 8;
  areNotesShown = false;
  availableGroupTypes = availableGroupTypes;
  actualActiveFrameIndex = 0;
  waitForDurationBeforeChangingFrames: number | null = null;

  get activeFrame(): Frame {
    return this.choreography.frames[this.activeFrameIndex];
  }

  constructor(
    public choreographyService: ChoreographyService,
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private toastService: ToastService,
    private translate: TranslateService,
    private dialog: MatDialog,
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.choreographyService.getChoreographyById(id).subscribe((choreography) => {
      return (this.choreography = choreography);
    });
  }

  addContentFrame(event: NewContentFrameEvent): void {
    const frame = createEmptyFrame(
      event.name,
      1,
      'content',
      this.choreography.carpet.height,
      this.choreography.carpet.width,
    );
    if (event.copyPrevious) {
      frame.grid = createDeepCopy(this.choreography.frames[this.activeFrameIndex]).grid;
    }
    this.choreography.frames = [...this.choreography.frames, frame];
    this.activeFrameIndex++;
  }

  addTransitionFrame(): void {
    const newTransitionFrame: Frame = {
      ...createDeepCopy(this.choreography.frames[this.choreography.frames.length - 1]),
      notes: '',
      type: 'transition',
      name: '',
    };
    this.choreography.frames = [...this.choreography.frames, newTransitionFrame];
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
    return this.peopleService.getPeopleForChoreography(this.choreography.id);
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

  get singleActiveChoreographyItem(): ChoreographyItem {
    if (this.activeChoreographyItems.length !== 1) {
      throw new Error(
        'Tried to perform an operation on an active choreography item while there are multiple selected which does not make sense.',
      );
    }
    return this.activeChoreographyItems[0];
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
    const tile = this.choreography.frames[this.activeFrameIndex].grid.find((item) =>
      getPeopleForContent(item.content).includes(personId),
    );
    if (typeof tile === 'undefined') {
      return;
    } else if (isPerson(tile.content)) {
      this.clearItem(tile);
    } else if (isGroup(tile.content)) {
      removePersonFromGroup(tile.content, personId);
    }
  }

  removePersonFromCarpet(index: number): void {
    const frame = this.choreography.frames[this.activeFrameIndex];
    this.clearItem(frame.grid[index]);
  }

  removePerson(personId: number): void {
    const index = this.choreography.choreographyPerson.map((person) => person.personId).indexOf(personId);
    if (index === -1) {
      throw new Error(
        `The person with id ${personId} to be deleted is not present in the people list of the choreography.`,
      );
    }
    this.choreography.choreographyPerson.splice(index, 1);
    this.choreography.frames.forEach((frame) =>
      frame.grid.forEach((item) => {
        if (isPerson(item.content) && item.content.personId === personId) {
          this.clearItem(item);
        } else if (isGroup(item.content)) {
          removePersonFromGroup(item.content, personId);
        }
      }),
    );
    this.toastService.createToastRaw(
      `${this.translate.instant('PEOPLE.PERSON_REMOVED')}: ${this.peopleService.getPersonById(personId).name},`,
    );
  }

  addPerson(personId: number): void {
    this.choreography.choreographyPerson.push({ personId: personId, color: null });
  }

  play(): void {
    this.activeChoreographyItems = [];
    this.playFrameIntervalId = window.setInterval(() => {
      this.actualActiveFrameIndex =
        (this.actualActiveFrameIndex + 1) % this.choreography.frames.reduce((acc, frame) => acc + frame.duration, 0);
      if (this.activeFrame.type === 'content' && this.activeFrame.duration === 1) {
        this.activeFrameIndex = (this.activeFrameIndex + 1) % this.choreography.frames.length;
        this.waitForDurationBeforeChangingFrames = null;
        return;
      } else if (this.activeFrame.type === 'transition') {
        if (this.waitForDurationBeforeChangingFrames === null) {
          this.waitForDurationBeforeChangingFrames = 1;
        } else {
          if (this.waitForDurationBeforeChangingFrames === this.activeFrame.duration) {
            this.activeFrameIndex = (this.activeFrameIndex + 1) % this.choreography.frames.length;
            if (this.activeFrame.duration === 1) {
              // setTimeout is needed in order to set the starting transition item first and then start the transition to the next one
              setTimeout(
                () => (this.activeFrameIndex = (this.activeFrameIndex + 1) % this.choreography.frames.length),
                0,
              );
              this.waitForDurationBeforeChangingFrames = null;
            } else {
              this.waitForDurationBeforeChangingFrames = 2;
            }
          } else {
            this.waitForDurationBeforeChangingFrames++;
          }
        }
      } else if (this.activeFrame.type === 'content' && this.activeFrame.duration !== 1) {
        if (this.waitForDurationBeforeChangingFrames === null) {
          this.waitForDurationBeforeChangingFrames = 2;
        } else {
          if (this.waitForDurationBeforeChangingFrames === this.activeFrame.duration) {
            this.activeFrameIndex = (this.activeFrameIndex + 1) % this.choreography.frames.length;
            this.waitForDurationBeforeChangingFrames = null;
          } else {
            this.waitForDurationBeforeChangingFrames++;
          }
        }
      }
    }, this.frameInterval / this.tempo);
  }

  clearItem(item: ChoreographyItem): void {
    item.content = null;
  }

  saveChoreography(): void {
    const dialogRef = this.dialog.open(SaveChoreographyDialogComponent, {});
    dialogRef
      .afterClosed()
      .pipe(filter((result) => !!result))
      .subscribe(() => {
        this.choreographyService
          .updateChoreography(this.choreography)
          .subscribe(() => this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_SAVED'));
      });
  }

  switchGroupType(groupType: GroupType): void {
    const previousGroup = this.singleActiveChoreographyItem.content as any;
    this.singleActiveChoreographyItem.content = createEmptyGroup(groupType);
    this.singleActiveChoreographyItem.content.color = previousGroup!.color;
    this.singleActiveChoreographyItem.content.flyerId = previousGroup!.flyerId;
    this.singleActiveChoreographyItem.content.backspotId = previousGroup!.backspotId;

    function setFromPreviousGroup(property: string, next: any, previous: any): void {
      if (next.hasOwnProperty(property) && previous.hasOwnProperty(property)) {
        next[property] = previous[property];
      }
    }

    setFromPreviousGroup('mainbaseId', this.singleActiveChoreographyItem.content, previousGroup);
    setFromPreviousGroup('sidebaseId', this.singleActiveChoreographyItem.content, previousGroup);
    setFromPreviousGroup('frontspotId', this.singleActiveChoreographyItem.content, previousGroup);
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

  toggleBetweenGroupAndSingleMode(): void {
    if (this.activeChoreographyItems === []) {
      return;
    }

    if (this.isGroup(this.singleActiveChoreographyItem.content)) {
      this.singleActiveChoreographyItem.content = null;
    } else {
      this.singleActiveChoreographyItem.content = createEmptyGroup('two');
    }
  }

  private disableAnimationsForNextTick(): void {
    const wereAnimationsOnInitially = this.areAnimationsOn;
    this.areAnimationsOn = false;
    setTimeout(() => (this.areAnimationsOn = wereAnimationsOnInitially), 0);
  }

  changeActiveFrame(selectedFrameIndex: number[]): void {
    this.activeFrameIndex = selectedFrameIndex[0];
    this.actualActiveFrameIndex = selectedFrameIndex[1];
  }

  moveFrameUpOrDown(direction: 'up' | 'down'): void {
    const newFrames = createDeepCopy(this.choreography.frames);
    if (direction === 'up') {
      const previousFrame = this.choreography.frames[this.activeFrameIndex - 1];
      newFrames[this.activeFrameIndex - 1] = this.choreography.frames[this.activeFrameIndex];
      newFrames[this.activeFrameIndex] = previousFrame;
      this.activeFrameIndex--;
    } else if (direction === 'down') {
      const nextFrame = this.choreography.frames[this.activeFrameIndex + 1];
      newFrames[this.activeFrameIndex + 1] = this.choreography.frames[this.activeFrameIndex];
      newFrames[this.activeFrameIndex] = nextFrame;
      this.activeFrameIndex++;
    }
    this.choreography.frames = newFrames;
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

  changeGroupColor(color: string): void {
    if (this.activeChoreographyItems.length === 0 || !isGroup(this.singleActiveChoreographyItem.content)) {
      return;
    }
    this.singleActiveChoreographyItem.content.color = color;
  }

  changePersonOnCarpet(id: number): void {
    this.removeExistingPersonFromCarpet(id);
    this.singleActiveChoreographyItem.content = { type: 'person', personId: id };
  }

  changePersonOnGroup(id: number): void {
    this.removeExistingPersonFromCarpet(id);
  }

  setActiveChoreographyItem(item: ChoreographyItem): void {
    if (this.playFrameIntervalId !== null) {
      return;
    }
    if (item.content === null) {
      item.content = { type: 'person', personId: null };
    }
    this.activeChoreographyItems = [item];
  }

  removeChoreographyItemContent(item: ChoreographyItem): void {
    if (this.playFrameIntervalId !== null) {
      return;
    }
    item.content = null;
    this.activeChoreographyItems = [];
  }

  openEditName(): void {
    const dialogRef = this.dialog.open(EditNameDialogComponent, {
      width: 'fit-content',
      data: { name: this.choreography.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === null) {
        return;
      }
      this.choreography.name = result;
    });
  }
}
