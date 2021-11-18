import { Component } from '@angular/core';
import { ChoreographyService } from '../choreography.service';
import { Choreography } from '../choreography';
import { Observable } from 'rxjs';
import { QueryOutput } from 'rx-query';

@Component({
  selector: 'app-choreographies',
  templateUrl: './choreographies.component.html',
  styleUrls: ['./choreographies.component.scss'],
})
export class ChoreographiesComponent {
  choreographies$: Observable<QueryOutput<Choreography[]>>;

  constructor(public choreographyService: ChoreographyService) {
    this.choreographies$ = this.choreographyService.getChoreographies();
  }
}
