import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserDto, UserToBeCreatedDto } from './usersDtos';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async deleteOne(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }

  async update(user: UserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  async getOrCreate(user: UserToBeCreatedDto): Promise<UserDto> {
    return await this.prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        teams: { create: [] },
      },
    });
  }
}
