import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google, calendar_v3 } from 'googleapis';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class GoogleCalendarService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // Создаем новый экземпляр клиента для каждого запроса или используем фабрику, 
  // чтобы избежать конфликтов при параллельных запросах разных пользователей
  private createClient() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  getAuthUrl(userId: number, habbitId?: string) {
    const client = this.createClient();

    const stateData = JSON.stringify({
      userId: userId,
      habbitId: habbitId || null
    });

    return client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
      'https://www.googleapis.com/auth/calendar.events'
    ],
      state: Buffer.from(stateData).toString('base64'),
    });
  }

  async saveTokens(userId: number, code: string) {
    const client = this.createClient();
    const { tokens } = await client.getToken(code);
    
    // Подготавливаем данные для обновления
    const updateData: any = {
      googleAccessToken: tokens.access_token,
      googleTokenExpiry: tokens.expiry_date as number,
    };

    if (tokens.refresh_token) {
      updateData.googleRefreshToken = tokens.refresh_token;
    }

    await this.usersRepository.update(userId, updateData);
  }

  private async getAuthenticatedClient(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user?.googleRefreshToken) {
      throw new UnauthorizedException('Google Calendar не подключен или отсутствует Refresh Token');
    }

    const client = this.createClient();
    client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
      expiry_date: user.googleTokenExpiry,
    });

    // Автоматическое обновление токена, если истек
    client.on('tokens', async (tokens) => {
      if (tokens.access_token) {
        await this.usersRepository.update(userId, {
          googleAccessToken: tokens.access_token,
          googleTokenExpiry: tokens.expiry_date as number,
        });
      }
    });

    return client;
  }

  async getStatus(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    return { isConnected: !!user?.googleRefreshToken };
  }

  async addHabbitToCalendar(userId: number, habbitName: string, date: Date) {
    const auth = await this.getAuthenticatedClient(userId);
    const calendar = google.calendar({ version: 'v3', auth });

    const event: calendar_v3.Schema$Event = {
      summary: `🎯 Привычка: ${habbitName}`,
      description: 'Создано через Habbit Tracker',
      start: { dateTime: date.toISOString() },
      end: { dateTime: new Date(date.getTime() + 15 * 60000).toISOString() },
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 15 }],
      },
    };

    try {
      const res = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
      });
      return res.data;
    } catch (error) {
      throw new BadRequestException('Ошибка при создании события: ' + error.message);
    }
  }
}