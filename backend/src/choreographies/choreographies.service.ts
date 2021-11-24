import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Choreography } from './choreography.entity';
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
    return this.choreographyRepository.findOne(id, {
      relations: ['choreographyPeople'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.choreographyRepository.delete(id);
  }

  create(choreography: DeepPartial<Choreography>): Promise<Choreography> {
    const newChoreography = this.choreographyRepository.create(choreography);
    return this.choreographyRepository.save(newChoreography);
  }

  update(choreography: Choreography): Promise<Choreography> {
    return this.choreographyRepository.save(choreography);
  }
}
