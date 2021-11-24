import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChoreographyPerson } from './choreographyPerson.entity';

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
}
