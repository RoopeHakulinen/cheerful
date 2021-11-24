import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChoreographyPerson } from './choreographyPerson.entity';
import { Choreography } from '../choreographies/choreography.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    (type) => ChoreographyPerson,
    (choreographyPerson) => choreographyPerson.person,
    { cascade: true },
  )
  choreographyPeople: ChoreographyPerson[];

  @ManyToMany((type) => Choreography, (choreography) => choreography.people, {
    eager: true,
  })
  @JoinTable({ name: 'choreography_people' })
  choreographies: Choreography[];
}
