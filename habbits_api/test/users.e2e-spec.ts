import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe()); 
    
    await app.init();
  });

  it('/users (GET) - должен вернуть список и мету', async () => {
    const response = await request(app.getHttpServer())
      .get('/users?limit=5')
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(Number(response.body.meta.itemsPerPage)).toBe(5);
  });

  it('/users (POST) - должен создать привычку', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Новая привычка', desc: 'Тестовое описание' })
      .expect(201)
      .then((res) => {
        expect(res.body.name).toEqual('Новая привычка');
      });
  });

  it('/users/:id (PATCH) - должен обновить имя привычки', async () => {
  // 1. Сначала создаем привычку, чтобы получить актуальный ID
  const createRes = await request(app.getHttpServer())
    .post('/users')
    .send({ name: 'Старое имя', desc: 'Описание' })
    .expect(201);

  const id = createRes.body.id;

  // 2. Обновляем её
  const updateRes = await request(app.getHttpServer())
    .patch(`/users/${id}`)
    .send({ name: 'Обновленное имя' })
    .expect(200);

  expect(updateRes.body.name).toBe('Обновленное имя');
});

  it('/users/:id (DELETE) - должен удалить запись и вернуть 404 при повторном поиске', async () => {
  // 1. Создаем привычку
  const createRes = await request(app.getHttpServer())
    .post('/users')
    .send({ name: 'На удаление', desc: 'Скоро исчезну' })
    .expect(201);

  const id = createRes.body.id;

  // 2. Удаляем её (ожидаем 204, если вы ставили @HttpCode(204), иначе 200)
  await request(app.getHttpServer())
    .delete(`/users/${id}`)
    .expect(204); // Если в контроллере стоит NO_CONTENT

  // 3. Пытаемся найти её снова — должна быть ошибка 404
  await request(app.getHttpServer())
    .get(`/users/${id}`)
    .expect(404);
});

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    await app.close();

  });
});