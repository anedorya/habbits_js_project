import { Controller, Get, Post, Body, Patch, Param, Delete, 
  HttpCode, HttpStatus, Query } from '@nestjs/common';
import { HabbitsService } from './habbits.service';
import { CreateHabbitDto } from './dto/create-habbit.dto';
import { UpdateHabbitDto } from './dto/update-habbit.dto';
import { GetHabbitsQueryDto } from './dto/get-habbits-query.dto';


@Controller('habbits')
export class HabbitsController {
  constructor(private readonly habbitsService: HabbitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createHabbitDto: CreateHabbitDto) {
    return this.habbitsService.create(createHabbitDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: GetHabbitsQueryDto) {
    return this.habbitsService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.habbitsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateHabbitDto: UpdateHabbitDto) {
    return this.habbitsService.update(+id, updateHabbitDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.habbitsService.remove(+id);
  }
}
