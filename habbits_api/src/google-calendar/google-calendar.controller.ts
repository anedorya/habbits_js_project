import { Controller, Get, Query, Res, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import type { Response } from 'express';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly calendarService: GoogleCalendarService) {}


@Get('auth/:userId')
async auth(
  @Param('userId') userId: number, 
  @Query('habbitId') habbitId: string,
  @Res() res: Response) {
  const url = this.calendarService.getAuthUrl(userId, habbitId);
  res.redirect(url);
}

@Get('status/:userId')
async getStatus(@Param('userId') userId: number) {
  return await this.calendarService.getStatus(Number(userId));
}

// @Get('add-event/:userId')
// async testEvent(@Param('userId') userId: string) {
//   const habbitName = "Моя первая привычка";
//   const date = new Date();
//   date.setHours(date.getHours() + 1); 

//   try {
//     const result = await this.calendarService.addHabbitToCalendar(Number(userId), habbitName, date);
//     return {
//       message: 'Событие создано!',
//       link: result.htmlLink // Ссылка на событие в календаре
//     };
//   } catch (error) {
//     return { error: error.message };
//   }
// }


@Post('add-event/:userId')
async addEvent(
  @Param('userId') userId: string,
  @Body() body: { habitName: string; time: string }
) {
  const [hours, minutes] = body.time.split(':').map(Number);
  const scheduledDate = new Date();
  scheduledDate.setHours(hours, minutes, 0, 0);

  const result = await this.calendarService.addHabbitToCalendar(
    Number(userId), 
    body.habitName, 
    scheduledDate
  );

  return { link: result.htmlLink };
}



@Get('callback')
async callback(
  @Query('code') code: string, 
  @Query('state') state: string, 
  @Res() res: Response
  ) {
    if (!code) throw new BadRequestException('Код авторизации не получен');

    const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
    const { userId, habbitId } = decodedState;

    await this.calendarService.saveTokens(Number(userId), code);

    const redirectUrl = habbitId 
    ? `http://localhost:5173/habbit/${habbitId}?google=success`
    : `http://localhost:5173/?google=success`;

    res.redirect(redirectUrl);
}
}