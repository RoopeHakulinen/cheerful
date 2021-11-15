import { Pipe, PipeTransform } from '@angular/core';
import { ChoreographyService } from './choreography.service';
import { Choreography, ChoreographyPerson } from './choreography';

@Pipe({
  name: 'choreographyPerson',
})
export class ChoreographyPersonPipe implements PipeTransform {
  constructor(private choreographyService: ChoreographyService) {
  }

  transform(personId: number | null, choreography: Choreography): ChoreographyPerson {
    if (personId === null) {
      throw new Error(`No such person id ${personId} when looking up a person.`);
    }
    return choreography.people.find(person => person.personId === personId)!;
  }
}
