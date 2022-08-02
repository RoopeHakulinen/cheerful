import { Choreography, Person, User } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  choreographies: Choreography[];

  users: User[];

  people: Person[];
}

export type TeamToBeCreatedDto = Omit<TeamDto, 'id' | 'choreographies' | 'users' | 'people'>;