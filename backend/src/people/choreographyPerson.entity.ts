import { Column, Entity, ManyToOne } from 'typeorm';
import { Choreography } from '../choreographies/choreography.entity';
import { Person } from './person.entity';

@Entity()
export class ChoreographyPerson {
  @Column()
  color: string | null;

  @ManyToOne((type) => Person, (person) => person.choreographyPeople, {
    primary: true,
  })
  person: Person;

  @ManyToOne(
    (type) => Choreography,
    (choreography) => choreography.choreographyPeople,
    {
      primary: true,
    },
  )
  choreography: Choreography;
}
