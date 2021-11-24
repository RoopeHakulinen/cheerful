import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChoreographyPerson } from '../people/choreographyPerson.entity';
import { Carpet } from '../carpet/carpet.entity';
import { Person } from '../people/person.entity';

@Entity()
export class Choreography {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  team: string;

  @Column({ type: 'json' })
  frames: string;

  @OneToOne((type) => Carpet, (carpet) => carpet.choreography, {
    cascade: true,
    eager: true,
  })
  carpet: Carpet;

  @OneToMany(
    (type) => ChoreographyPerson,
    (choreographyPerson) => choreographyPerson.choreography,
    {
      cascade: true,
    },
  )
  choreographyPeople: ChoreographyPerson[];

  @ManyToMany((type) => Person, (person) => person.choreographies)
  people: Person[];
}
