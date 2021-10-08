import { Component, Input } from '@angular/core';
import { FourGroup } from '../../../choreography-group';
import { Person } from '../../../people';

@Component({
  selector: 'app-four-group',
  templateUrl: './four-group.component.html',
  styleUrls: ['./four-group.component.scss']
})
export class FourGroupComponent {

  @Input()
  people: Person[] = [];

  @Input()
  group!: FourGroup;

}
