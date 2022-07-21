import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ChoreographiesService } from './choreographies/choreographies.service';
import { ChoreographiesController } from './choreographies/choreographies.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ExercisesController } from './exercises/exercises.controller';
import { ExercisesService } from './exercises/exercises.service';

@Module({
  imports: [],
  controllers: [AppController, ChoreographiesController, UsersController, ExercisesController],
  providers: [PrismaService, ChoreographiesService, UsersService, ExercisesService],
})
export class AppModule {}
