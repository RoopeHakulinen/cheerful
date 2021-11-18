import { Column, Entity, ManyToOne } from 'typeorm';
import { Choreography } from '../choreographies/choreography.entity';
import { Person } from './person.entity';

@Entity()
export class ChoreographyPerson {
  @Column()
  color: string | null;

  @ManyToOne((type) => Person, (person) => person.choreographyPeople, {
    primary: true,
    eager: true,
  })
  person: Person;

  @ManyToOne((type) => Choreography, (choreography) => choreography.people, {
    primary: true,
  })
  choreography: Choreography;
}
