import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChoreographiesService } from './choreographies.service';
import { Choreography } from './choreography.entity';

export interface CreateChoreographyDto {
  name: string;
}

@Controller('choreographies')
export class ChoreographiesController {
  constructor(private choreographiesService: ChoreographiesService) {}

  @Get()
  getAll(): Promise<Choreography[]> {
    return this.choreographiesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Choreography> {
    return this.choreographiesService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() createChoreographyDto: CreateChoreographyDto): Promise<Choreography> {
    return this.choreographiesService.create(createChoreographyDto);
  }
}
