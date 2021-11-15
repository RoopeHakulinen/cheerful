import { Module } from '@nestjs/common';
import { ChoreographiesController } from './choreographies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choreography } from './choreography.entity';
import { ChoreographiesService } from './choreographies.service';

@Module({
  controllers: [ChoreographiesController],
  imports: [TypeOrmModule.forFeature([Choreography])],
  providers: [ChoreographiesService],
})
export class ChoreographiesModule {}
