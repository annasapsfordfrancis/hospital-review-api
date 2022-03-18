import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { User } from '../entities/user.entity';
import { SameAs } from '../sameas.decorator';
import { IsUnique } from '../unique.validator';

export class CreateUserDto {
  @IsString()
  @Length(5)
  @IsUnique([User])
  readonly username: string;

  @IsString()
  @Length(8)
  readonly password: string;

  @IsString()
  @Length(8)
  @SameAs('password', { message: 'Passwords are not identical.' })
  readonly retypedPassword: string;

  @IsEmail()
  @IsUnique([User])
  readonly email: string;

  @IsBoolean()
  readonly isadmin: boolean;
}
