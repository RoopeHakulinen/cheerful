import { Component, Input } from '@angular/core';
import { FourGroup } from '../../../choreography-group';

@Component({
  selector: 'app-four-group',
  templateUrl: './four-group.component.html',
  styleUrls: ['./four-group.component.scss']
})
export class FourGroupComponent {

  @Input()
  people: number[] = [];

  @Input()
  group!: FourGroup;

}
