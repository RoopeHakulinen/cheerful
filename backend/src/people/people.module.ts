import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { PeopleService } from '../../../frontend/src/app/people.service';
import { ChoreographyPerson } from './choreographyPerson.entity';

@Module({
  controllers: [PeopleController],
  imports: [TypeOrmModule.forFeature([ChoreographyPerson])],
  providers: [PeopleService],
})
export class PeopleModule {}
