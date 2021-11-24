import { Component } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../people';
import { filter, map } from 'rxjs';
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
  data$!: any;

  constructor(private peopleService: PeopleService) {
    this.peopleService
      .getPeople()
      .pipe(
        filter((queryOutput) => queryOutput.status === 'success'),
        map((queryOutput) => queryOutput.data!)
      )
      .subscribe((personWithChoreography) => {
        this.data$ = personWithChoreography.map((person) => {
          return {
            id: person.id,
            name: person.name,
            choreographies: person.choreographies.map((chor) => chor.name),
          };
        });
      });
  }

  applyFilter($event: KeyboardEvent): void {}
}
