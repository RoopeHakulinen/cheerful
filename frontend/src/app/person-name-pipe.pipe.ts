import { Pipe, PipeTransform } from '@angular/core';
import { PeopleService } from './people.service';

@Pipe({
  name: 'personName',
})
export class PersonNamePipe implements PipeTransform {
  constructor(private peopleService: PeopleService) {
  }

  transform(id: number | null): string {
    if (id === null) {
      return '';
    }
    return this.peopleService.getPersonById(id).name;
  }
}
