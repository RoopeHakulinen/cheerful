import { Component } from '@angular/core';
import { Choreography } from '../choreography';
import { ChoreographyItem, clearItem, Content, PersonContent } from '../choreography-item';
import {
  availableGroupTypes,
  ChoreographyGroup,
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
  TwoGroup,
} from '../choreography-group';
import { ChoreographyService } from '../choreography.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../people';
import { PeopleService } from '../people.service';

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

  constructor(public choreographyService: ChoreographyService, private route: ActivatedRoute, private peopleService: PeopleService) {
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

  get people(): Person[] {
    return this.peopleService.getPeopleForChoreography(this.choreography.id);
  }

  get availablePeople(): Person[] {
    if (this.activeChoreographyItem?.content === null) {
      return this.getAvailablePeopleForThisFrame();
    }
    if (isGroup(this.activeChoreographyItem?.content!)) {
      // TODO Add logic
      return this.getAvailablePeopleForThisFrame();
    }
    return [...this.getAvailablePeopleForThisFrame(), this.peopleService.getPersonById(this.activeChoreographyItem?.content.personId!)];
  }

  isPerson(content: Content): content is PersonContent {
    return isPerson(content);
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

  isGroup(content: Content): content is ChoreographyGroup {
    return isGroup(content);
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

  getAvailablePeopleForThisFrame(): Person[] {
    function getPeopleForContent(content: Content): number[] {
      if (content === null) {
        return [];
      }
      return isPerson(content) ? [content.personId] : getPeopleFromGroup(content);
    }

    const getPeopleCurrentlyInChoreography = this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid
      .reduce(
        (acc, tile) => [
          ...acc,
          ...getPeopleForContent(tile.content),
        ], [] as number[]);

    return this.people
      .filter(person => !getPeopleCurrentlyInChoreography.includes(person.id));
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

    // Clear person from the grid of all frames
    // TODO Use lenses?
    this.choreography.frames
      .forEach(frame => frame.subframes
        .forEach(subframe => subframe.grid
          .forEach(item => {
            if (isPerson(item.content) && item.content.personId === personId) {
              this.clearItem(item);
            }
            // TODO Remove from groups too
          }),
        ),
      );
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
}
