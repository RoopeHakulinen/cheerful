import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChoreographiesModule } from './choreographies/choreographies.module';

@Module({
  imports: [ChoreographiesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
