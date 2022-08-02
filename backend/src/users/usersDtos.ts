import { IsNumber, IsString } from 'class-validator';

export class UserDto {

  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;
}

export type UserToBeCreatedDto = Omit<UserDto, 'id'>;