import { Pipe, PipeTransform } from '@angular/core';
import { ChoreographyService } from './choreography.service';
import { map, Observable } from 'rxjs';
import { ChoreographyPerson } from './choreography';

@Pipe({
  name: 'choreographyPerson',
})
export class ChoreographyPersonPipe implements PipeTransform {
  constructor(private choreographyService: ChoreographyService) {
  }

  transform(personId: number | null, choreographyId: number): Observable<ChoreographyPerson> {
    if (personId === null) {
      throw new Error(`No such person id ${personId} when looking up a person.`);
    }
    return this.choreographyService.getChoreographiesById(choreographyId)
      .pipe(map(choreography => choreography.people.find(person => person.personId === personId)!));
  }
}
