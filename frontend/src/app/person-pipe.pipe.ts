import { Pipe, PipeTransform } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './people';

@Pipe({
  name: 'person',
})
export class PersonPipe implements PipeTransform {
  constructor(private peopleService: PeopleService) {
  }

  transform(id: number | null): Person {
    if (id === null) {
      throw new Error(`No such person id ${id} when looking up a person.`);
    }
    return this.peopleService.getPersonById(id);
  }
}
