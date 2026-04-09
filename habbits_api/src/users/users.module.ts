import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Habbits } from 'src/habbits/entities/habbit.entity';
import { GoogleCalendarModule } from 'src/google-calendar/google-calendar.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Habbits]), GoogleCalendarModule], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
