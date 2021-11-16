import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Choreography } from '../choreographies/choreography.entity';
import { Person } from './person.entity';

@Entity()
export class ChoreographyPerson {
  @PrimaryGeneratedColumn()
  foo: number;

  @Column()
  color: string | null;

  @ManyToOne((type) => Person, (person) => person.choreographyPeople)
  person: Person;

  @ManyToOne(
    (type) => Choreography,
    (choreography) => choreography.choreographyPeople,
  )
  choreography: Choreography;
}
