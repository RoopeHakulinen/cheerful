import { Module } from '@nestjs/common';
import { ChoreographiesController } from './choreographies.controller';

@Module({
  controllers: [ChoreographiesController],
})
export class ChoreographiesModule {}
