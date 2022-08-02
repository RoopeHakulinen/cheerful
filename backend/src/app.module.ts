import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ChoreographiesService } from './choreographies/choreographies.service';
import { ChoreographiesController } from './choreographies/choreographies.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ExercisesController } from './exercises/exercises.controller';
import { ExercisesService } from './exercises/exercises.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { PeopleController } from './people/people.controller';

@Module({
  imports: [],
  controllers: [AppController, ChoreographiesController, UsersController, ExercisesController, TeamsController, PeopleController],
  providers: [PrismaService, ChoreographiesService, UsersService, ExercisesService, TeamsService],
})
export class AppModule {}
