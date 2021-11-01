import { Component, EventEmitter, Input, Output } from '@angular/core';
import { changePersonInGroup, FiveGroup } from '../../../choreography-group';
import { ChoreographyPerson } from '../../../choreography';

@Component({
  selector: 'app-five-group',
  templateUrl: './five-group.component.html',
  styleUrls: ['./five-group.component.scss']
})
export class FiveGroupComponent {

  @Input()
  people: ChoreographyPerson[] = [];

  @Input()
  group!: FiveGroup;

  @Output()
  changePersonInGroup = new EventEmitter<number>();

  changeGroupMember(personId: number, groupPosition: string): void {
    this.changePersonInGroup.emit(personId);
    changePersonInGroup(personId, groupPosition, this.group);
  }
}
