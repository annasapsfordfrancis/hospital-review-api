import { IsString } from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly location: string;

  @IsString()
  readonly description: string;
}
