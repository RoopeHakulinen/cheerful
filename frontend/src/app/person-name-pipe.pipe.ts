import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './people';

@Pipe({
  name: 'personNamePipe'
})
export class PersonNamePipePipe implements PipeTransform {

  transform(id: number, people: Person[]): string {
    if (id === null) {
      return '';
    }
    const result = people.find(person => person.id === id);
    if (!result) {
      throw new Error('No such player exists');
    }
    return result.name;
  }
}
