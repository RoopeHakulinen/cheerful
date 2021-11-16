import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChoreographyPerson } from './choreographyPerson.entity';
import { CreateChoreographyDto } from './people.controller';

@Injectable()
export class ChoreographyPeopleService {
  constructor(
    @InjectRepository(ChoreographyPerson)
    private peopleRepository: Repository<ChoreographyPerson>,
  ) {}

  findAll(): Promise<ChoreographyPerson[]> {
    return this.peopleRepository.find();
  }

  findOne(id: number): Promise<ChoreographyPerson> {
    return this.peopleRepository.findOne(id, { relations: ['people'] });
  }

  async remove(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  create(
    createChoreographyDto: CreateChoreographyDto,
  ): Promise<ChoreographyPerson> {
    const choreographyPerson = this.peopleRepository.create(
      createChoreographyDto,
    );
    return this.peopleRepository.save(choreographyPerson);
  }
}
