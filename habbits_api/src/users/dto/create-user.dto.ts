import { IsString, IsNotEmpty, MinLength, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
  
  @IsString() 
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  @MinLength(3, { message: 'Имя должно быть не менее 3 символов' })
  name: string;
}