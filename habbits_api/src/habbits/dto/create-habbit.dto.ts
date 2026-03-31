import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateHabbitDto {
  @IsString()         // Должно быть строкой
  @IsNotEmpty()       // Не может быть пустым
  @MinLength(3)       // Минимум 3 символа
  name: string;
  @IsString()
  @IsOptional()
  desc?: string;
}