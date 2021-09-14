import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-choreographies',
  templateUrl: './choreographies.component.html',
  styleUrls: ['./choreographies.component.scss']
})
export class ChoreographiesComponent implements OnInit {
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

  ngOnInit() {
  }

}
