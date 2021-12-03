import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ChoreographiesService } from './choreographies.service';
import { Choreography } from './choreography.entity';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonDto } from '../people/people.controller';

export class ChoreographyPersonDto {
  @IsString()
  color: string;

  @ValidateNested()
  @Type(() => PersonDto)
  person: PersonDto;

  @IsNumber()
  choreographyId: number;
}

export class CarpetDto {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  horizontalSegments: number;

  @IsNumber()
  verticalSegments: number;

  @IsString()
  color: string;
}

export class ChoreographyDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CarpetDto)
  carpet: CarpetDto;

  //TODO: validate the frames
  frames: any;

  @IsString()
  team: string;

  @ValidateNested()
  @Type(() => ChoreographyPersonDto)
  people: ChoreographyPersonDto[];
}

@Controller('choreographies')
export class ChoreographiesController {
  constructor(private choreographiesService: ChoreographiesService) {}

  @Get()
  getAll(): Promise<Choreography[]> {
    return this.choreographiesService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Choreography> {
    return this.choreographiesService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() choreographyDto: ChoreographyDto): Promise<Choreography> {
    return this.choreographiesService.create(choreographyDto);
  }

  @Put('/:id')
  update(@Body() choreographyDto: any): Promise<Choreography> {
    return this.choreographiesService.update(choreographyDto);
  }
}
