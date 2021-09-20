import { Component } from '@angular/core';

@Component({
  selector: 'app-choreographies',
  templateUrl: './choreographies.component.html',
  styleUrls: ['./choreographies.component.scss']
})
export class ChoreographiesComponent {
  choreographies = [
    {
      name: 'Joulunäytös',
      team: 'Flames'
    },
    {
      name: 'Kevätnäytös',
      team: 'Lightnings'
    },
    {
      name: 'SM-karsinnat',
      team: 'Flash'
    }
  ];

  constructor() {
  }

}
