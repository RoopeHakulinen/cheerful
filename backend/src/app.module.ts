import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ChoreographiesModule } from './choreographies/choreographies.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [ChoreographiesModule, PeopleModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
