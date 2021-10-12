import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../people';

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
  value: Person | null = null;

  @Output()
  changeGroupMember = new EventEmitter<Person>()

  get availablePeople(): Person[] {
    if (this.value === null) {
      return this.people;
    }
    return [...this.people, this.value];
  }
}
