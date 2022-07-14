import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from './usersDtos';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getOrCreate(user: UserDto): Promise<UserDto> {
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
