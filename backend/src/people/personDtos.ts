import { IsNumber, IsString } from 'class-validator';

export class PersonDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export type PersonToBeCreatedDto = Omit<PersonDto, 'id'>;