import { Component, OnInit } from '@angular/core';
import { Choreography } from '../choreography';
import { ChoreographyItem } from '../choreography-item';

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
    frames: [{
      grid: []
    }],
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

  constructor() {
  }

  ngOnInit() {
    this.choreography.frames[0].grid = this.generateGrid();
  }

  addFrame() {
    this.choreography.frames.push({
      grid: JSON.parse(JSON.stringify(this.choreography.frames[this.choreography.frames.length - 1].grid))
    });
    this.activeFrame = this.choreography.frames.length - 1;
  }

  removeFrame(index: number) {
    this.choreography.frames.splice(index, 1);
    if (this.activeFrame >= this.choreography.frames.length) {
      this.activeFrame = this.choreography.frames.length - 1;
    }
  }

  generateGrid() {
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

  clearItem(item: ChoreographyItem) {
    item.text = '';
    item.color = '';
    item.position = ['center', 'center'];
    item.sign = {text: '', color: ''};
  }

  getAvailablePeopleForThisFrame() {
    return this.choreography.people.filter(
      person => !this.choreography.frames[this.activeFrame].grid
        .reduce(
          (acc, tile) => [
            ...acc,
            tile.text
          ], [] as string[])
        .includes(person));
  }

  swapItems({first, second}) {
    this.disableAnimationsForNextTick();
    const temp = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].grid[first]));
    const temp2 = JSON.parse(JSON.stringify(this.choreography.frames[this.activeFrame].grid[second]));
    this.choreography.frames[this.activeFrame].grid[first] = temp2;
    this.choreography.frames[this.activeFrame].grid[second] = temp;
  }

  play() {
    this.animationIntervalId = window.setInterval(() => {
      this.activeFrame = (this.activeFrame + 1) % this.choreography.frames.length;
      if (!this.isLoopingOn && (this.activeFrame + 1 === this.choreography.frames.length)) {
        this.pause()
      }
    }, this.frameInterval);

  }

  pause() {
    window.clearInterval(this.animationIntervalId);
    this.animationIntervalId = 0;
  }

  removePerson(name: string) {
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

  setPositionForItem(activeChoreographyItem: ChoreographyItem, option: any) {
    activeChoreographyItem.position = option;
  }

  toggleAnimations() {
    this.areAnimationsOn = !this.areAnimationsOn;
  }

  toggleLooping() {
    this.isLoopingOn = !this.isLoopingOn;
  }

  private disableAnimationsForNextTick() {
    const wereAnimationsOnInitially = this.areAnimationsOn;
    this.areAnimationsOn = false;
    setTimeout(() => this.areAnimationsOn = wereAnimationsOnInitially, 0);
  }

  frameDurationChange(newFrameInterval: number) {
    this.frameInterval = newFrameInterval;
  }
}
