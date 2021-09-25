import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';
import { IsUniqueForUser } from 'src/utils';

export class CreateUserDto {
  @IsEmail()
  @IsUniqueForUser()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @IsUniqueForUser()
  nickname: string;
}
