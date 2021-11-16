import { Controller, Get } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  getAll(): Promise<Person[]> {
    return this.peopleService.findAll();
  }
}
