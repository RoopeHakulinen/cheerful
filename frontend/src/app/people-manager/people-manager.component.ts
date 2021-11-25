import { Component } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../people';
import { filter, map, Observable } from 'rxjs';
import { QueryOutput } from 'rx-query';
import { Choreography } from '../choreography';

export interface PersonWithChoreographies extends Person {
  choreographies: Choreography[];
}

@Component({
  selector: 'app-people-manager',
  templateUrl: './people-manager.component.html',
  styleUrls: ['./people-manager.component.scss'],
})
export class PeopleManagerComponent {
  displayedColumns: string[] = ['id', 'name', 'choreographies'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  people$: Observable<QueryOutput<PersonWithChoreographies[]>>;
  data$!: any;

  constructor(private peopleService: PeopleService) {
    this.people$ = this.peopleService.getPeople();
    this.people$
      .pipe(
        filter((queryOutput) => queryOutput.status === 'success'),
        map((queryOutput) => queryOutput.data!)
      )
      .subscribe((personWithChoreography) => {
        this.data$ = personWithChoreography.map((person) => {
          return {
            id: person.id,
            name: person.name,
            choreographies: person.choreographies.map(
              (choreography) => choreography.name
            ),
          };
        });
      });
  }

  applyFilter($event: KeyboardEvent): void {}
}
