import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChoreographyPerson } from '../choreography';
import { Person } from '../people';
import { PeopleService } from '../people.service';

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

  constructor(private peopleService: PeopleService) {
  }

  get availablePeopleToAdd(): Person[] {
    return this.peopleService.getPeopleForChoreography(1)
      .filter(person => !this.people.find(choreographyPerson => choreographyPerson.personId === person.id));
  }

  showPersonName(): string {
    return ``;
  }
}
