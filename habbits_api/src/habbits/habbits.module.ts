import { Module } from '@nestjs/common';
import { HabbitsService } from './habbits.service';
import { HabbitsController } from './habbits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habbit } from './entities/habbit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habbit])], 
  controllers: [HabbitsController],
  providers: [HabbitsService],
})
export class HabbitsModule {}
