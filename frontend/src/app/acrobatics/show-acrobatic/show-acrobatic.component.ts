import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-acrobatic',
  templateUrl: './show-acrobatic.component.html',
  styleUrls: ['./show-acrobatic.component.scss'],
})
export class ShowAcrobaticComponent {
  @Input()
  id!: number;

  @Input()
  name!: string;

  @Input()
  icon!: string;

  @Input()
  difficulty!: number;
}
