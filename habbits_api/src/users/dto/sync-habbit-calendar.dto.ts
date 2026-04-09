import { IsISO8601 } from 'class-validator';

export class SyncHabbitCalendarDto {
  @IsISO8601()
  startTime: string;
}