import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-acrobatic',
  templateUrl: './single-acrobatic.component.html',
  styleUrls: ['./single-acrobatic.component.scss'],
})
export class SingleAcrobaticComponent {
  @Input()
  id!: number;

  @Input()
  name!: string;

  @Input()
  icon!: string;

  @Input()
  difficulty!: number;
}
