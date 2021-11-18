import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Choreography } from '../choreographies/choreography.entity';
import { Person } from './person.entity';

@Entity('choreography_people')
export class ChoreographyPerson {
  @Column()
  color: string | null;

  @ManyToOne((type) => Person, (person) => person.choreographyPeople, {
    eager: true,
  })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @PrimaryColumn()
  personId: number;

  @ManyToOne((type) => Choreography, (choreography) => choreography.people, {})
  @JoinColumn({ name: 'choreographyId' })
  choreography: Choreography;

  @PrimaryColumn()
  choreographyId: number;
}
