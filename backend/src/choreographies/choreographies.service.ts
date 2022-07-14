import { Injectable } from '@nestjs/common';
import { Choreography, ChoreographyDto } from './choreographyDtos';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChoreographiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(teamId: number): Promise<Choreography[]> {
    return await this.prisma.choreography.findMany({
      where: { team: { id: teamId } },
    });
  }

  async findOne(id: number): Promise<Choreography> {
    return await this.prisma.choreography.findUnique({
      where: { id: id },
      include: {
        carpet: true,
        choreographyPerson: true,
      },
    });
  }

  async deleteOne(id: number): Promise<Choreography> {
    return await this.prisma.choreography.delete({
      where: { id: id },
    });
  }

  async create(choreography: ChoreographyDto): Promise<Choreography> {
    return await this.prisma.choreography.create({
      data: {
        name: choreography.name,
        team: {
          connect: { id: choreography.teamId },
        },
        frames: choreography.frames,
        carpet: {
          create: {
            width: choreography.carpet.width,
            height: choreography.carpet.height,
            color: choreography.carpet.color,
            horizontalSegments: choreography.carpet.horizontalSegments,
            verticalSegments: choreography.carpet.verticalSegments,
          },
        },
        choreographyPerson: {
          create: choreography.people,
        },
      },
    });
  }

  async update(choreography: ChoreographyDto): Promise<Choreography> {
    return await this.prisma.choreography.update({
      where: { id: choreography.id },
      data: {
        name: choreography.name,
        team: {
          connect: { id: choreography.teamId },
        },
        frames: choreography.frames,
        carpet: {
          update: {
            width: choreography.carpet.width,
            height: choreography.carpet.height,
            color: choreography.carpet.color,
            horizontalSegments: choreography.carpet.horizontalSegments,
            verticalSegments: choreography.carpet.verticalSegments,
          },
        },
        choreographyPerson: {
          create: choreography.people,
        },
      },
    });
  }
}
