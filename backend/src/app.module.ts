import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ChoreographiesService } from './choreographies/choreographies.service';
import { ChoreographiesController } from './choreographies/choreographies.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, ChoreographiesController, UsersController],
  providers: [PrismaService, ChoreographiesService, UsersService],
})
export class AppModule {}
