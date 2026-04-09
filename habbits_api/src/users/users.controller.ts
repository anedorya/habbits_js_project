import { Controller, Get, Post, Body, Patch, Param, Delete, 
  HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { SyncHabbitCalendarDto } from './dto/sync-habbit-calendar.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Добавить/удалить привычку юзеру

  @Post(':id/habbits/:habbitId')
  async addHabbit(
    @Param('id', ParseIntPipe) userId: number,
    @Param('habbitId', ParseIntPipe) habbitId: number,
  ) {
    return await this.usersService.addHabbitToUser(userId, habbitId);
  }

  @Delete(':id/habbits/:habbitId')
  async removeHabbit(
    @Param('id', ParseIntPipe) userId: number,
    @Param('habbitId', ParseIntPipe) habbitId: number,
  ) {
    return await this.usersService.removeHabbitFromUser(userId, habbitId);
  }

  @Post(':id/habbits/:habbitId/sync')
  async syncToCalendar(
    @Param('id') userId: number,
    @Param('habbitId') habbitId: number,
    @Body() syncDto: SyncHabbitCalendarDto,
  ) {
    return await this.usersService.syncHabbitToGoogleCalendar(
      userId,
      habbitId,
      syncDto.startTime,
    );
  }


//   @Get(':id/calendar-status')
// async getCalendarStatus(@Param('id') userId: number) {
//   const user = await this.usersService.findOne(userId);
//   return {
//     isConnected: !!user.googleRefreshToken, // true, если календарь подключен
//   };
// }

}

