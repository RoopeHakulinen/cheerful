import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Team } from '@prisma/client';
import { TeamDto, TeamToBeCreatedDto } from './teamDtos';
import { TeamsService } from './teams.service';


@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) { }

  @Get()
  getAll(): Promise<Team[]> {
    return this.teamsService.findAll();
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
    return this.teamsService.deleteOne(parseInt(id, 10));
  }

  @Put()
  update(@Body() team: TeamDto): Promise<Team> {
    return this.teamsService.update(team);
  }
}
