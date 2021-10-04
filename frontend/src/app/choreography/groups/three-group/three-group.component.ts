import { Component, Input } from '@angular/core';
import { ThreeGroup } from '../../../choreography-group';

@Component({
  selector: 'app-three-group',
  templateUrl: './three-group.component.html',
  styleUrls: ['./three-group.component.scss']
})
export class ThreeGroupComponent {

  @Input()
  people: string[] = [];

  @Input()
  group!: ThreeGroup;


}
