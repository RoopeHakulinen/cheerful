import { Component } from '@angular/core';
import { Choreography } from '../choreography';
import { ChoreographyItem, clearItem, Content } from '../choreography-item';
import {
  availableGroupTypes,
  createEmptyGroup,
  FiveGroup,
  FourGroup,
  getPeopleFromGroup,
  GroupType,
  isFiveGroup,
  isFourGroup,
  isGroup,
  isPerson,
  isThreeGroup,
  isTwoGroup,
  ThreeGroup,
  TwoGroup
} from '../choreography-group';
import { ChoreographyService } from '../choreography.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../people';

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

  constructor(public choreographyService: ChoreographyService, private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.choreographyService.getChoreographiesById(id).subscribe(choreography => this.choreography = choreography);
  }

  addFrame(): void {
    this.choreography.frames.push({
      subframes: JSON.parse(JSON.stringify(this.choreography.frames[this.choreography.frames.length - 1].subframes))
      , notes: ''
    });
    this.activeFrame = this.choreography.frames.length - 1;
  }

  removeFrame(index: number): void {
    this.choreography.frames.splice(index, 1);
    if (this.activeFrame >= this.choreography.frames.length) {
      this.activeFrame = this.choreography.frames.length - 1;
    }
  }

  get isActiveItemGroup(): boolean {
    return isGroup(this.activeChoreographyItem!.content);
  }

  swapItems({ first, second }: { first: number, second: number }): void {
    this.disableAnimationsForNextTick();
    const temp = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[first]));
    const temp2 = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[second]));
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

  getAvailablePeopleForThisFrame(): Person[] {
    function getPeopleForContent(content: Content): Person[] {
      if (content === null) {
        return [];
      }
      return isPerson(content) ? [content] : getPeopleFromGroup(content);
    }

    return this.choreography.people.filter(
      person => !this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid
        .reduce(
          (acc, tile) => [
            ...acc,
            ...getPeopleForContent(tile.content)
          ], [] as Person[])
        .map(person => person.name)
        .includes(person.name));
  }

  setPositionForItem(activeChoreographyItem: ChoreographyItem, option: any): void {
    activeChoreographyItem.position = option;
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

  removePerson(person: Person): void {
    const index = this.choreography.people.map(person => person.name).findIndex(choreographyPerson => choreographyPerson === person.name);
    if (index === -1) {
      return;
    }
    this.choreography.people.splice(index, 1);
    this.choreography.frames
      .forEach(frame => frame.subframes
        .forEach(subframe => subframe.grid
          .forEach(item => {
            if (item.content === person) {
              this.clearItem(item);
            }
          })
        )
      );
  }

  clearItem(item: ChoreographyItem): void {
    clearItem(item);
  }

  switchGroupType(groupType: GroupType): void {
    this.activeChoreographyItem!.content = createEmptyGroup(groupType);
  }

  toggleBetweenGroupAndSingleMode(): void {
    if (this.isActiveItemGroup) {
      this.activeChoreographyItem!.content = null;
    } else {
      this.activeChoreographyItem!.content = createEmptyGroup('two');
    }
  }

  get availablePeople(): Person[] {
    if (this.activeChoreographyItem?.content === null) {
      return this.getAvailablePeopleForThisFrame();
    }
    if (!isPerson(this.activeChoreographyItem?.content!)) {
      return this.getAvailablePeopleForThisFrame();
    }
    return [...this.getAvailablePeopleForThisFrame(), this.activeChoreographyItem?.content!];
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
    if (!isGroup(this.activeChoreographyItem!.content)) {
      return;
    }
    if (this.activeChoreographyItem === null) {
      return;
    }
    this.activeChoreographyItem.content.color = color;
  }
}
