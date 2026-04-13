import { Injectable, OnModuleInit, ConflictException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Users } from './entities/user.entity';
import { Habbits } from 'src/habbits/entities/habbit.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';

import { NotFoundException } from '@nestjs/common';
import { GoogleCalendarService } from 'src/google-calendar/google-calendar.service';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>, 

    @InjectRepository(Habbits)
    private readonly habbitRepository: Repository<Habbits>,
    private readonly calendarService: GoogleCalendarService,

  ) {}

    async onModuleInit() {
    const count = await this.userRepository.count();
    
    if (count === 0) {
      const hashedPassword = await bcrypt.hash('qwerty', this.saltRounds);
      const defaultUsers = [
    { 
        email: 'default_user@example.com',
        password: hashedPassword,
        name: 'Default user'
      },
      ];

      await this.userRepository.save(defaultUsers);
      console.log('✅ В базу данных добавлен дефолтовый юзер');
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...userData } = createUserDto;
    
    const existingUser = await this.userRepository.findOne({ where: { email } });
  
    if (existingUser) {
      throw new ConflictException(`Пользователь с email ${email} уже зарегистрирован`);
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    
    const newUser = this.userRepository.create({
      ...userData,
      email,
      password: hashedPassword,
    });
    
    return await this.userRepository.save(newUser);
  }

async findAll(query: GetUsersQueryDto) {
  const { name } = query;
  const page = query.page || 1;
  const limit = query.limit || 10;
  
  const skip = (page - 1) * limit;

  const queryBuilder = this.userRepository.createQueryBuilder('user');

  if (name) {
    queryBuilder.andWhere('user.name ILIKE :name', { name: `%${name}%` });
  }

  queryBuilder.orderBy('user.createdAt', 'DESC'); 

  const [items, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  return {
    data: items,
    meta: {
      totalItems: total,
      currentPage: page,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}


async findOne(id: number) {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: ['habbits'] 
  });

  if (!user) {
    throw new NotFoundException(`Юзер с ID ${id} не найден`);
  }
  
  return user;
}

async update(id: number, updateUserDto: UpdateUserDto) {
  const { email, password, ...userData } = updateUserDto;

  if (email) {
    const userWithSameEmail = await this.userRepository.findOne({
      where: { 
        email, 
        id: Not(id) // Ищем этот email у ВСЕХ, кроме текущего юзера
      },
    });

  if (userWithSameEmail) {
      throw new ConflictException(`Email ${email} уже занят другим пользователем`);
    }
  }
  
  const dataToUpdate: any = { ...userData };
  if (email) dataToUpdate.email = email;

  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, this.saltRounds);
  }
  

  const user = await this.userRepository.preload({
    id: id,
    ...dataToUpdate,
  });

  if (!user) {
    throw new NotFoundException(`User #${id} not found`);
  }
  
  return this.userRepository.save(user);
}

async remove(id: number) {
  const user = await this.findOne(id); 
  if (!user) {
    throw new NotFoundException(`User #${id} not found`);
  }
  return this.userRepository.remove(user);
}

async addHabbitToUser(userId: number, habbitId: number) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['habbits'], 
  });

  if (!user) throw new NotFoundException('Юзер не найден');

  const habbit = await this.habbitRepository.findOneBy({ id: habbitId });
  if (!habbit) throw new NotFoundException('Привычка не найдена');

  const habbitExists = user.habbits.some((h) => h.id === habbitId);
  if (!habbitExists) {
    user.habbits.push(habbit);
    return await this.userRepository.save(user); 
  }

  return user;
}


async removeHabbitFromUser(userId: number, habbitId: number) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['habbits'], 
  });

  if (!user) throw new NotFoundException(`Пользователь #${userId} не найден`);

  const initialCount = user.habbits.length;
  user.habbits = user.habbits.filter((h) => h.id !== habbitId);

  if (user.habbits.length !== initialCount) {
    return await this.userRepository.save(user);
  }

  return user;
}


async syncHabbitToGoogleCalendar(userId: number, habbitId: number, startTime: string) {
  // 1. Находим пользователя и проверяем наличие токенов
  const user = await this.userRepository.findOneBy({ id: userId });
  if (!user) throw new NotFoundException('Пользователь не найден');

  if (!user.googleAccessToken || !user.googleRefreshToken) {
    // Выбрасываем 400 Bad Request с понятным сообщением
    throw new BadRequestException('Google Calendar не подключен. Пожалуйста, пройдите авторизацию.');
  }

  // 2. Проверяем существование привычки
  const habbit = await this.habbitRepository.findOneBy({ id: habbitId });
  if (!habbit) throw new NotFoundException(`Привычка с ID ${habbitId} не найдена`);

  // 3. Вызываем сервис календаря
  try {
    const date = new Date(startTime);
    await this.calendarService.addHabbitToCalendar(userId, habbit.name, date);
    return { success: true, message: 'Событие успешно добавлено в Google Calendar' };
  } catch (error) {
    // Если ошибка от самого Google (например, токен отозван)
    throw new BadRequestException('Ошибка Google API: ' + error.message);
  }
}

}
