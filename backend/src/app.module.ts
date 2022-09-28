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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { OAuth2GoogleConfig } from './config/oauth2-google.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [OAuth2GoogleConfig],
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
    ChoreographiesController,
    UsersController,
    ExercisesController,
    TeamsController,
    PeopleController,
  ],
  providers: [PrismaService, ChoreographiesService, ExercisesService, TeamsService, UsersService],
})
export class AppModule {}
