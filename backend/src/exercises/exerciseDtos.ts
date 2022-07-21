import { IsNumber, IsString } from 'class-validator';

export class TagDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class ExerciseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  difficulty: number;

  tags: TagDto[];
}

export type ExerciseToBeCreatedDto = Omit<ExerciseDto, 'id'>;