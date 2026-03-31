import { PartialType } from '@nestjs/mapped-types';
import { CreateHabbitDto } from './create-habbit.dto';

export class UpdateHabbitDto extends PartialType(CreateHabbitDto) {}
