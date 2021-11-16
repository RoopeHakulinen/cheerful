import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { ChoreographyPerson } from './choreographyPerson.entity';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Module({
  controllers: [PeopleController],
  imports: [TypeOrmModule.forFeature([ChoreographyPerson, Person])],
  providers: [PeopleService],
})
export class PeopleModule {}
