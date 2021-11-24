import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';
import { PersonDto } from './people.controller';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.peopleRepository.find({
      relations: ['choreographies'],
    });
  }

  findOne(id: number): Promise<Person> {
    return this.peopleRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  create(personDto: PersonDto): Promise<Person> {
    const newPerson = this.peopleRepository.create(personDto);
    return this.peopleRepository.save(newPerson);
  }
}
