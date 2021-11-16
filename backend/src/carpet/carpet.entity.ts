import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Choreography } from '../choreographies/choreography.entity';

@Entity()
export class Carpet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  color: string;

  @Column()
  horizontalSegments: number;

  @Column()
  verticalSegments: number;

  @OneToOne((type) => Choreography, (choreography) => choreography.carpet)
  @JoinColumn()
  choreography: Choreography;
}
