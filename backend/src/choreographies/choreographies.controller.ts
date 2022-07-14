import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChoreographiesService } from './choreographies.service';
import { Choreography, ChoreographyDto } from './choreographyDtos';

@Controller('choreographies')
export class ChoreographiesController {
  constructor(private choreographiesService: ChoreographiesService) {}

  @Get()
  getAll(): Promise<Choreography[]> {
    return this.choreographiesService.findAll(1);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Choreography> {
    return this.choreographiesService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() choreography: ChoreographyDto): Promise<Choreography> {
    return this.choreographiesService.create(choreography);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Choreography> {
    return this.choreographiesService.deleteOne(parseInt(id, 10));
  }
}
