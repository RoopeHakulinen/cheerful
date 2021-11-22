import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChoreographiesService } from './choreographies.service';
import { Choreography } from './choreography.entity';
import { IsJSON, IsNumber, IsString, ValidateNested } from 'class-validator';
import { transformChoreographyDtoToMatchDatabase } from '../transformChoreography';
import { Type } from 'class-transformer';

export class ChoreographyPersonDto {
  @IsString()
  color: string;

  @IsNumber()
  personId: number;
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

  @IsJSON()
  frames: string;

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

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Choreography> {
    return this.choreographiesService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() choreographyDto: ChoreographyDto): Promise<Choreography> {
    return this.choreographiesService.create(
      transformChoreographyDtoToMatchDatabase(choreographyDto),
    );
  }
}
