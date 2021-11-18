import { Module } from '@nestjs/common';
import { ChoreographiesController } from './choreographies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choreography } from './choreography.entity';
import { ChoreographiesService } from './choreographies.service';
import { Carpet } from '../carpet/carpet.entity';
import { ChoreographyPerson } from '../people/choreographyPerson.entity';

@Module({
  controllers: [ChoreographiesController],
  imports: [
    TypeOrmModule.forFeature([Choreography, ChoreographyPerson, Carpet]),
  ],
  providers: [ChoreographiesService],
})
export class ChoreographiesModule {}
