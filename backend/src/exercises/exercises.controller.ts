import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Exercise } from '@prisma/client';
import { ExerciseDto, ExerciseToBeCreatedDto } from './exerciseDtos';
import { ExercisesService } from './exercises.service';


@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) { }

  @Get()
  getAll(): Promise<Exercise[]> {
    return this.exercisesService.findAll(1);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Exercise> {
    return this.exercisesService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() exercise: ExerciseToBeCreatedDto): Promise<Exercise> {
    return this.exercisesService.create(exercise);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Exercise> {
    return this.exercisesService.deleteOne(parseInt(id, 10));
  }

  @Put()
  update(@Body() exercise: ExerciseDto): Promise<Exercise> {
    return this.exercisesService.update(exercise);
  }
}
