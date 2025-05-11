import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
