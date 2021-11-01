import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeopleService } from '../../../people.service';
import { ChoreographyPerson } from '../../../choreography';

@Component({
  selector: 'app-group-options',
  templateUrl: './group-person-selector.component.html',
  styleUrls: ['./group-person-selector.component.scss']
})
export class GroupPersonSelectorComponent {

  @Input()
  people: ChoreographyPerson[] = [];

  @Input()
  spot: string = '';

  @Input()
  value: number | null = null;

  @Output()
  changeGroupMember = new EventEmitter<number>()

  constructor(private peopleService: PeopleService) {
  }
}
