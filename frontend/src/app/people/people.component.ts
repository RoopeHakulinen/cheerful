import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createPerson, Person } from '../people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  @Input()
  people: Person[] = [];

  @Output()
  add = new EventEmitter<Person>();
  @Output()
  remove = new EventEmitter<Person>();

  constructor() {
  }

  createPerson(name: string): Person {
    return createPerson(name);
  }
}
