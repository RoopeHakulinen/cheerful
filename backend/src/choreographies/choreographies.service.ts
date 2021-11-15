import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choreography } from './choreography.entity';
import { CreateChoreographyDto } from './choreographies.controller';

@Injectable()
export class ChoreographiesService {
  constructor(
    @InjectRepository(Choreography)
    private choreographyRepository: Repository<Choreography>,
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
    const choreography = this.choreographyRepository.create(createChoreographyDto);
    return this.choreographyRepository.save(choreography);
  }
}
