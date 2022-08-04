import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Team } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TeamDto, TeamToBeCreatedDto } from './teamDtos';
import { TeamsService } from './teams.service';


@Controller('teams')
export class TeamsController {
  constructor(
    private teamsService: TeamsService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get('my')
  getAllMyTeams(): Promise<Team[]> {
    return this.prisma.team.findMany({
      where: {
        users: {
          some: {
            id: 1,
          },
        },
      },
      include: {
        choreographies: true,
      },
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() team: TeamToBeCreatedDto): Promise<Team> {
    return this.teamsService.create(team);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Team> {
    return this.teamsService.delete(parseInt(id, 10));
  }

  @Put()
  update(@Body() team: TeamDto): Promise<Team> {
    return this.teamsService.update(team);
  }
}
