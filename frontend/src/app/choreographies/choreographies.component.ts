import { Component } from '@angular/core';
import { ChoreographyService } from '../choreography.service';
import { Choreography } from '../choreography';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choreographies',
  templateUrl: './choreographies.component.html',
  styleUrls: ['./choreographies.component.scss']
})
export class ChoreographiesComponent {

  choreographies$: Observable<Choreography[]>;

  constructor(public choreographyService: ChoreographyService) {
    this.choreographies$ = this.choreographyService.getChoreographies();
  }

}
