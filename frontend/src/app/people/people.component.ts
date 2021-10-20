import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChoreographyPerson } from '../choreography';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  @Input()
  people: ChoreographyPerson[] = [];

  @Output()
  add = new EventEmitter<number>();
  @Output()
  remove = new EventEmitter<number>();

  constructor() {
  }

  // createPerson(name: string): Person {
  //   return createPerson(name);
  // }
}
