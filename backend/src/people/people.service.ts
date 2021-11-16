import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.peopleRepository.find();
  }

  findOne(id: number): Promise<Person> {
    return this.peopleRepository.findOne(id, { relations: ['people'] });
  }

  async remove(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }
}
