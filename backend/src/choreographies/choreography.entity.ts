import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ChoreographyPerson } from '../people/choreographyPerson.entity';
import { Carpet } from '../carpet/carpet.entity';

@Entity()
export class Choreography {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  team: string;
  //
  // @Column({ type: 'json' })
  // frames: any;

  @OneToOne((type) => Carpet, (carpet) => carpet.choreography)
  @JoinColumn()
  carpet: Carpet;

  @OneToMany(
    (type) => ChoreographyPerson,
    (choreographyPerson) => choreographyPerson.choreography,
  )
  choreographyPeople: ChoreographyPerson[];
}
