import { IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  // TODO
  choreographies: any[];

  users: any[];

  people: any[];
}

export type TeamToBeCreatedDto = Omit<TeamDto, 'id' | 'choreographies' | 'users' | 'people'>;