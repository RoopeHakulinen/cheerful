import { Component, EventEmitter, Input, Output } from '@angular/core';
import { changePersonInGroup, TwoGroup } from '../../../choreography-group';
import { ChoreographyPerson } from '../../../choreography';

@Component({
  selector: 'app-two-group',
  templateUrl: './two-group.component.html',
  styleUrls: ['./two-group.component.scss']
})
export class TwoGroupComponent {

  @Input()
  people: ChoreographyPerson[] = [];

  @Input()
  group!: TwoGroup;

  @Output()
  changePersonInGroup = new EventEmitter<number>();

  changeGroupMember(personId: number, groupPosition: string): void {
    this.changePersonInGroup.emit(personId);
    changePersonInGroup(personId, groupPosition, this.group);
  }
}
