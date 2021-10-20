import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../people';
import { PeopleService } from '../../../people.service';

@Component({
  selector: 'app-group-options',
  templateUrl: './group-person-selector.component.html',
  styleUrls: ['./group-person-selector.component.scss']
})
export class GroupPersonSelectorComponent {

  @Input()
  people: Person[] = [];

  @Input()
  spot: string = '';

  @Input()
  value: number | null = null;

  @Output()
  changeGroupMember = new EventEmitter<number>()

  constructor(private peopleService: PeopleService) {
  }

  get availablePeople(): Person[] {
    if (this.value === null) {
      return this.people;
    }
    return [...this.people, this.peopleService.getPersonById(this.value)];
  }
}
