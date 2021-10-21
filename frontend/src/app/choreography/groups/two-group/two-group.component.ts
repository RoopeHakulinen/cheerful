import { Component, Input } from '@angular/core';
import { TwoGroup } from '../../../choreography-group';

@Component({
  selector: 'app-two-group',
  templateUrl: './two-group.component.html',
  styleUrls: ['./two-group.component.scss']
})
export class TwoGroupComponent {

  @Input()
  people: number[] = [];

  @Input()
  group!: TwoGroup;

}
