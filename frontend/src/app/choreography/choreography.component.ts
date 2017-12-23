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
    name: 'My choreography',
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
  activeChoreographyItem: ChoreographyItem;

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
    return Array(this.choreography.carpet.height)
      .fill(
        Array(this.choreography.carpet.width).fill({
          text: '',
          color: '',
          position: ['center', 'center'],
          sign: null
        })
      ).map(row => row.map(item => ({
          ...item,
          position: [...item.position],
        })
        )
      );
  }

  clearItem(item: ChoreographyItem) {
    item.text = '';
    item.color = '';
    item.position = ['center', 'center'];
    item.sign = null;
  }

  getAvailablePeopleForThisFrame() {
    return this.choreography.people.filter(
      person => !this.choreography.frames[this.activeFrame].grid
        .reduce(
          (acc, row) => [
            ...acc,
            ...row.reduce(
              (acc2, tile) => [...acc2, tile.text], [])
          ], [])
        .includes(person));
  }
}
