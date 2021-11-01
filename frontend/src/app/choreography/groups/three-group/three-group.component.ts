import { Component, EventEmitter, Input, Output } from '@angular/core';
import { changePersonInGroup, ThreeGroup } from '../../../choreography-group';
import { ChoreographyPerson } from '../../../choreography';

@Component({
  selector: 'app-three-group',
  templateUrl: './three-group.component.html',
  styleUrls: ['./three-group.component.scss']
})
export class ThreeGroupComponent {

  @Input()
  people: ChoreographyPerson[] = [];

  @Input()
  group!: ThreeGroup;

  @Output()
  changePersonInGroup = new EventEmitter<number>();

  changeGroupMember(personId: number, groupPosition: string): void {
    this.changePersonInGroup.emit(personId);
    changePersonInGroup(personId, groupPosition, this.group);
  }


}
