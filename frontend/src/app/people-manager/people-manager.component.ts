import { Component } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../people';
import { Observable } from 'rxjs';
import { QueryOutput } from 'rx-query';

@Component({
  selector: 'app-people-manager',
  templateUrl: './people-manager.component.html',
  styleUrls: ['./people-manager.component.scss'],
})
export class PeopleManagerComponent {
  people$: Observable<QueryOutput<Person[]>>;

  constructor(private peopleService: PeopleService) {
    this.people$ = this.peopleService.getPeople();
  }
}
