import { IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  choreographies: any[];

  users: any[];
}

export type TeamToBeCreatedDto = Omit<TeamDto, 'id' | 'choreographies' | 'users'>;