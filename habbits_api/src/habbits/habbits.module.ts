import { Module } from '@nestjs/common';
import { HabbitsService } from './habbits.service';
import { HabbitsController } from './habbits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habbits } from './entities/habbit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habbits])
  ],
  controllers: [HabbitsController],
  providers: [HabbitsService],
})
export class HabbitsModule {}
