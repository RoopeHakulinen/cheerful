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
    frames: TEST_FRAMES,
    carpet: {
      color: '#5151b8',
      height: 12,
      width: 12,
      segments: 6
    }
  };
  activeFrame = 0;
  activeChoreographyItem: ChoreographyItem | null = null;

  animationIntervalId: number;
  frameInterval = 2000;
  areAnimationsOn = true;
  isLoopingOn = true;
  isVoiceSynthesisOn = false;
  tempo = 8;


  constructor() {
  }

  ngOnInit(): void {
    this.choreography.frames[0].grid = this.generateGrid();
  }

  addFrame(): void {
    this.choreography.frames.push({
      grid: JSON.parse(JSON.stringify(this.choreography.frames[this.choreography.frames.length - 1].grid))
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
      person => !this.choreography.frames[this.activeFrame].grid
        .reduce(
          (acc, tile) => [
            ...acc,
            tile.text
          ], [] as string[])
        .includes(person));
  }

  swapItems({ first, second }: { first: number, second: number }): void {
    this.disableAnimationsForNextTick();
    const temp = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].grid[first]));
    const temp2 = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].grid[second]));
    this.choreography.frames[this.activeFrame].grid[first] = temp2;
    this.choreography.frames[this.activeFrame].grid[second] = temp;

  }

  play(): void {
    this.animationIntervalId = window.setInterval(() => {
      this.activeFrame = (this.activeFrame + 1) % this.choreography.frames.length;
      if (!this.isLoopingOn && (this.activeFrame + 1 === this.choreography.frames.length)) {
        this.pause()
      }
    }, this.frameInterval);

  }

  pause(): void {
    window.clearInterval(this.animationIntervalId);
    this.animationIntervalId = 0;
  }

  removePerson(name: string): void {
    const index = this.choreography.people.findIndex(person => name === person);
    if (index === -1) {
      return;
    }
    this.choreography.people.splice(index, 1);
    this.choreography.frames.forEach(frame => frame.grid.forEach(item => {
      if (item.text === name) {
        this.clearItem(item);
      }
    }));
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
    const temp1 = this.choreography.frames[1];
    this.choreography.frames[1] = this.choreography.frames[0];
    this.choreography.frames[0] = temp1;
  }

  logGridToConsole(): void {
    console.log(JSON.stringify(this.choreography.frames))
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
    this.choreography.carpet.segments = this.choreography.carpet.width / 2;
  }
}
