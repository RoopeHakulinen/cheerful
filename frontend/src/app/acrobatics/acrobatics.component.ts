import { Component } from '@angular/core';

export interface Acrobatic {
  id: number;
  name: string;
  icon: string;
  difficulty: number;
}

@Component({
  selector: 'app-acrobatics',
  templateUrl: './acrobatics.component.html',
  styleUrls: ['./acrobatics.component.scss'],
})
export class AcrobaticsComponent {
  listOfAcrobatics: Acrobatic[] = [
    { id: 1, name: 'Jump', icon: 'settings_accessibility', difficulty: 2 },
    { id: 2, name: 'Stand', icon: 'accessibility', difficulty: 1 },
    { id: 3, name: 'Walk', icon: 'directions_walk', difficulty: 1 },
    { id: 4, name: 'Run', icon: 'directions_run', difficulty: 2 },
    { id: 5, name: 'Wave', icon: 'emoji_people', difficulty: 1 },
    { id: 6, name: 'Throw', icon: 'sports_handball', difficulty: 3 },
    { id: 7, name: 'Lift', icon: 'sports_kabaddi', difficulty: 4 },
  ];
}
