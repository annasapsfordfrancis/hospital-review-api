import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5)
  readonly username: string;

  @IsString()
  @Length(8)
  readonly password: string;

  @IsString()
  @Length(8)
  readonly retypedPassword: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly isadmin: boolean;
}
