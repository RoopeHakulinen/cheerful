import { Injectable } from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { TeamDto, TeamToBeCreatedDto } from './teamDtos';


@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Team[]> {
    return await this.prisma.team.findMany();
  }

  async findOne(id: number): Promise<Team> {
    return await this.prisma.team.findUnique({
      where: { id: id },
      include: { users: true, choreographies: true },
    });
  }

  async deleteOne(id: number): Promise<Team> {
    return await this.prisma.team.delete({
      where: { id: id },
    });
  }

  async create(team: TeamToBeCreatedDto): Promise<Team> {
    return await this.prisma.team.create({
      data: {
        name: team.name,
      },
    });
  }

  async update(team: TeamDto): Promise<Team> {
    return await this.prisma.team.update({
      where: { id: team.id },
      data: {
        name: team.name,
      },
    });
  }
}
