import { IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Choreography {
  id: number;
  name: string;
}

export class ChoreographyPersonDto {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  color: string;

  @IsNumber()
  personId: number;
}

export class CarpetDto {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  horizontalSegments: number;

  @IsNumber()
  verticalSegments: number;

  @IsString()
  color: string;
}

export class ChoreographyDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  frames: any;

  @IsNumber()
  teamId: number;

  @ValidateNested()
  @Type(() => CarpetDto)
  carpet: CarpetDto;

  @ValidateNested()
  @Type(() => ChoreographyPersonDto)
  choreographyPerson: ChoreographyPersonDto[];
}

export type ChoreographyToBeCreatedDto = Omit<ChoreographyDto, 'id'>;
