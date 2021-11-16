import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(
  //   (type) => ChoreographyPerson,
  //   (choreographyPerson) => choreographyPerson.person,
  // )
  // choreographyPeople: ChoreographyPerson[];
}
