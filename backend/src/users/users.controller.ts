import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UserDto, UserToBeCreatedDto } from './usersDtos';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  async getMe(@Req() req: any): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }

  @Get('logout')
  async logout(@Res() res: any): Promise<void> {
    res.clearCookie('AuthToken', { secure: true, httpOnly: true });
    res.redirect('/');
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(parseInt(id, 10));
  }

  @Post()
  getOrCreate(@Body() user: UserToBeCreatedDto): Promise<UserDto> {
    return this.usersService.getOrCreate(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteOne(parseInt(id, 10));
  }

  @Put()
  update(@Body() team: UserDto): Promise<User> {
    return this.usersService.update(team);
  }
}
