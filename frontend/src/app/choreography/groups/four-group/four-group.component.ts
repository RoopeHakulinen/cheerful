import { Component, EventEmitter, Input, Output } from '@angular/core';
import { changePersonInGroup, FourGroup } from '../../../choreography-group';
import { ChoreographyPerson } from '../../../choreography';

@Component({
  selector: 'app-four-group',
  templateUrl: './four-group.component.html',
  styleUrls: ['./four-group.component.scss']
})
export class FourGroupComponent {

  @Input()
  people: ChoreographyPerson[] = [];

  @Input()
  group!: FourGroup;

  @Output()
  changePersonInGroup = new EventEmitter<number>();

  changeGroupMember(personId: number, groupPosition: string): void {
    this.changePersonInGroup.emit(personId);
    changePersonInGroup(personId, groupPosition, this.group);
  }
}
