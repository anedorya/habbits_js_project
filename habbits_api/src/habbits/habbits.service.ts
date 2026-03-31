import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habbit } from './entities/habbit.entity';

import { CreateHabbitDto } from './dto/create-habbit.dto';
import { UpdateHabbitDto } from './dto/update-habbit.dto';
import { GetHabbitsQueryDto } from './dto/get-habbits-query.dto';

import { NotFoundException } from '@nestjs/common';


@Injectable()
export class HabbitsService implements OnModuleInit {
  constructor(
    @InjectRepository(Habbit)
    private readonly habbitRepository: Repository<Habbit>, 
  ) {}

    async onModuleInit() {
    const count = await this.habbitRepository.count();
    
    if (count === 0) {
      const defaultHabbits = [
{ 
        name: 'Пить воду', 
        desc: 'Выпивать стакан чистой воды сразу после пробуждения и поддерживать водный баланс в течение дня для бодрости.' 
      },
      { 
        name: 'Чтение книг', 
        desc: 'Уделять минимум 20 минут в день чтению профессиональной или художественной литературы без отвлечения на гаджеты.' 
      },
      { 
        name: 'Зарядка', 
        desc: 'Выполнять комплекс базовых упражнений или йогу каждое утро, чтобы разогреть мышцы и подготовить тело к рабочему дню.' 
      },
      { 
        name: 'Медитация', 
        desc: 'Практиковать осознанное дыхание в тишине в течение 10 минут для снижения уровня стресса и улучшения концентрации.' 
      },
      { 
        name: 'Планирование дня', 
        desc: 'Составлять список из 3-5 приоритетных задач на завтрашний день перед сном, чтобы утро начиналось продуктивно.' 
      },
      { 
        name: 'Прогулка на свежем воздухе', 
        desc: 'Проходить не менее 5000 шагов в парке или по городу, чтобы насытить кровь кислородом и сменить обстановку.' 
      },
      { 
        name: 'Изучение английского', 
        desc: 'Учить 5 новых слов или разбирать одно грамматическое правило, используя мобильные приложения или видеоуроки.' 
      },
      { 
        name: 'Цифровой детокс', 
        desc: 'Отключать все уведомления и не использовать смартфон за один час до сна для улучшения качества ночного отдыха.' 
      },
      { 
        name: 'Ведение дневника', 
        desc: 'Записывать три главных достижения или благодарности за прошедший день, чтобы фокусироваться на позитивных моментах.' 
      },
      { 
        name: 'Программирование', 
        desc: 'Выделять минимум один час на написание кода или изучение новых архитектурных паттернов в NestJS и TypeScript.' 
      },
      ];

      await this.habbitRepository.save(defaultHabbits);
      console.log('✅ База данных заполнена начальными привычками');
    }
  }

  async create(createHabbitDto: CreateHabbitDto) {
    const newHabbit = this.habbitRepository.create(createHabbitDto);
    return await this.habbitRepository.save(newHabbit);
  }

async findAll(query: GetHabbitsQueryDto) {
  const { name } = query;
  const page = query.page || 1;
  const limit = query.limit || 10;
  
  const skip = (page - 1) * limit;

  const queryBuilder = this.habbitRepository.createQueryBuilder('habbit');

  if (name) {
    queryBuilder.andWhere('habbit.name ILIKE :name', { name: `%${name}%` });
  }

  queryBuilder.orderBy('habbit.createdAt', 'DESC'); 

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

  // async findAll() {
  //   return await this.habbitRepository.find();
  // }

  // async findOne(id: number) {
  //   return await this.habbitRepository.findOneBy({ id });
  // }

async findOne(id: number) {
  const habbit = await this.habbitRepository.findOneBy({ id });
  if (!habbit) {
    throw new NotFoundException(`Привычка с ID ${id} не найдена`);
  }
  return habbit;
}

  async update(id: number, updateHabbitDto: UpdateHabbitDto) {
  const habbit = await this.habbitRepository.preload({
    id: id,
    ...updateHabbitDto,
  });

  if (!habbit) {
    throw new NotFoundException(`Habbit #${id} not found`);
  }
  
  return this.habbitRepository.save(habbit);
}

  async remove(id: number) {
  const habbit = await this.findOne(id); 
  if (!habbit) {
    throw new NotFoundException(`Habbit #${id} not found`);
  }
  return this.habbitRepository.remove(habbit);
}
}
