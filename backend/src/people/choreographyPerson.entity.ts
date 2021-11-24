import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Choreography } from '../choreographies/choreography.entity';
import { Person } from './person.entity';

@Entity('choreography_people')
export class ChoreographyPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string | null;

  @ManyToOne((type) => Person, (person) => person.choreographyPeople, {
    eager: true,
  })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column({ select: false })
  personId: number;

  @ManyToOne(
    (type) => Choreography,
    (choreography) => choreography.choreographyPeople,
    { orphanedRowAction: 'delete' },
  )
  @JoinColumn({ name: 'choreographyId' })
  choreography: Choreography;

  @Column()
  choreographyId: number;
}
