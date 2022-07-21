import { Injectable } from '@nestjs/common';
import { Exercise } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ExerciseDto, ExerciseToBeCreatedDto } from './exerciseDtos';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) { }

  async findAll(teamId: number): Promise<Exercise[]> {
    return await this.prisma.exercise.findMany({ include: { tags: true } });
  }

  async findOne(id: number): Promise<Exercise> {
    return await this.prisma.exercise.findUnique({
      where: { id: id },
      include: { tags: true },
    });
  }

  async deleteOne(id: number): Promise<Exercise> {
    return await this.prisma.exercise.delete({
      where: { id: id },
    });
  }

  async create(exercise: ExerciseToBeCreatedDto): Promise<Exercise> {
    return await this.prisma.exercise.create({
      data: {
        name: exercise.name,
        description: exercise.description,
        difficulty: exercise.difficulty,
        tags: {
          connectOrCreate: exercise.tags.map(tag => ({
            where: { id: tag.id },
            create: { name: tag.name },
          })),
        },
      },
    });
  }

  async update(exercise: ExerciseDto): Promise<Exercise> {
    return await this.prisma.exercise.update({
      where: { id: exercise.id },
      data: {
        name: exercise.name,
        description: exercise.description,
        difficulty: exercise.difficulty,
        tags: {
          connectOrCreate: exercise.tags.map(tag => ({
            where: { id: tag.id },
            create: { name: tag.name },
          })),
        },
      },
    });
  }
}
