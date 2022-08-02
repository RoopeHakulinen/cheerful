import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Person } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PersonDto, PersonToBeCreatedDto } from './personDtos';

@Controller('people')
export class PeopleController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getAll(): Promise<Person[]> {
    return this.prisma.person.findMany();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Person> {
    return this.prisma.person.findUnique({
      where: { id: id },
    });
  }

  @Post()
  create(@Body() person: PersonToBeCreatedDto): Promise<Person> {
    return this.prisma.person.create({
      data: {
        name: person.name,
      },
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Person> {
    return this.prisma.person.delete({
      where: { id: id },
    });
  }

  @Put()
  update(@Body() person: PersonDto): Promise<Person> {
    return this.prisma.person.update({
      where: { id: person.id },
      data: {
        name: person.name,
      },
    });
  }
}
