import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './person.entity';
import { IsNumber, IsString } from 'class-validator';

export class PersonDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  getAll(): Promise<Person[]> {
    return this.peopleService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Person> {
    return this.peopleService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() personDto: PersonDto): Promise<Person> {
    return this.peopleService.create(personDto);
  }
}
