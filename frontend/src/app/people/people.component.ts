import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  @Input()
  people: string[] = [];

  @Output()
  add = new EventEmitter<string>();
  @Output()
  remove = new EventEmitter<string>();

  constructor() {
  }

}
