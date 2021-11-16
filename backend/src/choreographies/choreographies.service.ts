import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choreography } from './choreography.entity';
import { CreateChoreographyDto } from './choreographies.controller';
import { Carpet } from '../carpet/carpet.entity';

@Injectable()
export class ChoreographiesService {
  constructor(
    @InjectRepository(Choreography)
    private choreographyRepository: Repository<Choreography>,
    @InjectRepository(Carpet)
    private carpetRepository: Repository<Carpet>,
  ) {}

  findAll(): Promise<Choreography[]> {
    return this.choreographyRepository.find();
  }

  findOne(id: number): Promise<Choreography> {
    return this.choreographyRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.choreographyRepository.delete(id);
  }

  create(createChoreographyDto: CreateChoreographyDto): Promise<Choreography> {
    const choreography = this.choreographyRepository.create(
      createChoreographyDto,
    );
    return this.choreographyRepository.save(choreography);
  }

  createSpecial(): Promise<Choreography> {
    const choreography = this.choreographyRepository.create({
      name: 'foobar',
      carpet: {
        width: 5,
        height: 5,
        color: 'red',
        horizontalSegments: 5,
        verticalSegments: 5,
      },
      team: 'PP-70',
    });
    return this.choreographyRepository.save(choreography);
  }
}
