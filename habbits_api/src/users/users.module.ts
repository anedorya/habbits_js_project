import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Habbit } from 'src/habbits/entities/habbit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Habbit])], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
