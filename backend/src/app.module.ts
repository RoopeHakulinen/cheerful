import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ChoreographiesService } from './choreographies/choreographies.service';
import { ChoreographiesController } from './choreographies/choreographies.controller';

@Module({
  imports: [],
  controllers: [AppController, ChoreographiesController],
  providers: [PrismaService, ChoreographiesService],
})
export class AppModule {}
