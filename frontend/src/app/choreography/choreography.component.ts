import { Component, OnInit } from '@angular/core';
import { Choreography } from '../choreography';
import { ChoreographyItem } from '../choreography-item';
import { TEST_FRAMES } from '../testFrames';

@Component({
  selector: 'app-choreography',
  templateUrl: './choreography.component.html',
  styleUrls: ['./choreography.component.scss']
})
export class ChoreographyComponent implements OnInit {

  choreography: Choreography = {
    name: 'SM-karsinnat',
    team: 'Flash',
    people: [
      'Roope',
      'Olli',
      'Darya',
      'Arina',
      'Ansku',
      'Kimi',
      'Kille',
      'Kimara',
      'Katri',
      'Lasso',
      'Anna',
      'Vilho',
      'Väinö',
      'Jaana',
      'Ville',
      'Niina',
      'Marjo',
      'Napoleon',
      'Maria',
      'Kari',
      'Sari',
      'Antti',
      'Janne',
      'Teppo',
      'Matti',
      'Joonas',
    ],
    frames: [{ subframes: TEST_FRAMES, notes: '' }, { subframes: TEST_FRAMES, notes: '' },
      { subframes: TEST_FRAMES, notes: '' }, { subframes: TEST_FRAMES, notes: '' }, {
        subframes: TEST_FRAMES,
        notes: ''
      }, { subframes: TEST_FRAMES, notes: '' },
      { subframes: TEST_FRAMES, notes: '' }, { subframes: TEST_FRAMES, notes: '' }],
    carpet: {
      color: '#5151b8',
      height: 12,
      width: 12,
      horizontalSegments: 12,
      verticalSegments: 6
    }
  };
  activeFrame = 0;
  activeSubframe = 0;
  activeChoreographyItem: ChoreographyItem | null = null;

  animationIntervalId: number | null = null;
  frameInterval = 3333;
  areAnimationsOn = true;
  isLoopingOn = true;
  isVoiceSynthesisOn = false;
  tempo = 8;
  areNotesShown = false;

  constructor() {
  }

  ngOnInit(): void {
    this.choreography.frames[0].subframes[0].grid = this.generateGrid();
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

  generateGrid(): ChoreographyItem[] {
    return Array(this.choreography.carpet.height * this.choreography.carpet.width)
      .fill({
        text: '',
        color: '',
        shape: 'rounded',
        position: ['center', 'center'],
        sign: null
      }).map(item => ({
          ...item,
          position: [...item.position],
        })
      ).map((item, index) => ({
        ...item,
        text: index % 3 === 0 ? this.choreography.people[index] : ''
      }));
  }

  clearItem(item: ChoreographyItem): void {
    item.text = '';
    item.color = '';
    item.position = ['center', 'center'];
    item.sign = { text: '', color: '' };
  }

  getAvailablePeopleForThisFrame(): string[] {
    return this.choreography.people.filter(
      person => !this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid
        .reduce(
          (acc, tile) => [
            ...acc,
            tile.text
          ], [] as string[])
        .includes(person));
  }

  swapItems({ first, second }: { first: number, second: number }): void {
    this.disableAnimationsForNextTick();
    const temp = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[first]));
    const temp2 = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[second]));
    this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[first] = temp2;
    this.choreography.frames[this.activeFrame].subframes[this.activeSubframe].grid[second] = temp;
  }

  play(): void {
    this.animationIntervalId = window.setInterval(() => {
      this.activeFrame = (this.activeFrame + 1) % this.choreography.frames.length;
      if (!this.isLoopingOn && (this.activeFrame + 1 === this.choreography.frames.length)) {
        this.pause();
      }
    }, this.frameInterval);
  }

  pause(): void {
    if (this.animationIntervalId === null) {
      return;
    }
    window.clearInterval(this.animationIntervalId);
    this.animationIntervalId = null;
  }

  removePerson(name: string): void {
    const index = this.choreography.people.findIndex(person => name === person);
    if (index === -1) {
      return;
    }
    this.choreography.people.splice(index, 1);
    this.choreography.frames
      .forEach(frame => frame.subframes
        .forEach(subframe => subframe.grid
          .forEach(item => {
            if (item.text === name) {
              this.clearItem(item);
            }
          })
        )
      );
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
}
