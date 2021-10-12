import { Component, Input } from '@angular/core';
import { FiveGroup } from '../../../choreography-group';
import { Person } from '../../../people';

@Component({
  selector: 'app-five-group',
  templateUrl: './five-group.component.html',
  styleUrls: ['./five-group.component.scss']
})
export class FiveGroupComponent {

  @Input()
  people: Person[] = [];

  @Input()
  group!: FiveGroup;

}
