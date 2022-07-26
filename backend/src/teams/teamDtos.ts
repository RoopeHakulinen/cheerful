import { IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export type TeamToBeCreatedDto = Omit<TeamDto, 'id'>;