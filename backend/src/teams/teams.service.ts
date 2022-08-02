import { Injectable } from '@nestjs/common';
import { Choreography, Team } from '@prisma/client';
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
      include: { users: true, choreographies: true, people: true },
    });
  }

  async delete(id: number): Promise<any> {
    const deleteChoreographies = this.prisma.choreography.deleteMany({
      where: {
        teamId: id,
      },
    })
    
    const deleteTeam = this.prisma.team.delete({
      where: {
        id: id,
      },
    })
    
    return await this.prisma.$transaction([deleteChoreographies, deleteTeam])
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
        users: {
          connect: team.users.map(user => (
            { id: user.id }
          )),
        },
        people: {
          connectOrCreate: team.people.map(person => ({
            where: { id: person.id },
            create: { name: person.name },
          })),
        },
      },
    });
  }
}
