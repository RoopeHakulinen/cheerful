import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './usersDtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  getOrCreate(@Body() user: UserDto): Promise<UserDto> {
    return this.usersService.getOrCreate(user);
  }
}
