import { Controller, Get } from '@nestjs/common';
import { ChoreographyPeopleService } from './people.service';
import { ChoreographyPerson } from './choreographyPerson.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateChoreographyDto {
  @IsNumber()
  personId: number;

  @IsString()
  color: string | null;

  @IsNumber()
  choreographies: number[];
}

@Controller('people')
export class PeopleController {
  constructor(private peopleService: ChoreographyPeopleService) {}

  @Get()
  getAll(): Promise<ChoreographyPerson[]> {
    return this.peopleService.findAll();
  }
}
