import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-group-options',
  templateUrl: './group-person-selector.component.html',
  styleUrls: ['./group-person-selector.component.scss']
})
export class GroupPersonSelectorComponent {

  @Input()
  people: string[] = [];

  @Input()
  spot: string = '';

  @Output()
  changeGroupMember = new EventEmitter<string>()

}
