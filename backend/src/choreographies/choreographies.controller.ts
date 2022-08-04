import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChoreographiesService } from './choreographies.service';
import { Choreography, ChoreographyDto, ChoreographyToBeCreatedDto } from './choreographyDtos';

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
  create(@Body() choreography: ChoreographyToBeCreatedDto): Promise<Choreography> {
    return this.choreographiesService.create(choreography);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Choreography> {
    return this.choreographiesService.deleteOne(parseInt(id, 10));
  }

  @Put()
  update(@Body() choreography: ChoreographyDto): Promise<Choreography> {
    return this.choreographiesService.update(choreography);
  }
}
