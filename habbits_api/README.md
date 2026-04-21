# Habbits API (NestJS + PostgreSQL)

Простое REST API для управления привычками, построенное на NestJS и TypeORM.

### 1. Требования
* Node.js (v18+)
* PostgreSQL (v14+)

### 2. Установка зависимостей
```bash
npm install


### 3. Настройка базы данных
Убедитесь, что в PostgreSQL создана база данных habbits_db.
Настройки подключения находятся в /.env:
Host: localhost
Port: 5432
User: postgres
Password: qwerty

При первом запуске в БД будет заполнена информация о 10 привычках.

### 4. Запуск приложения
```bash
npm run start:dev


### 5. Эндпоинты (API)
Привычки (Habbits)
Метод	Путь	Описание
GET	/habbits	Получить список с пагинацией и фильтром
GET	/habbits/:id	Получить одну привычку по ID
POST	/habbits	Создать новую привычку
PATCH	/habbits/:id	Обновить существующую привычку
DELETE	/habbits/:id	Удалить привычку


### 6. Примеры запросов в Postman
1. Создание (POST)
URL: http://localhost:3000/habbits
Body (JSON):
json
{
  "name": "Read books",
  "desc": "Read 20 pages every day"
}

2. Получение с фильтром и пагинацией (GET)
URL: http://localhost:3000/habbits?name=read&page=1&limit=5
name — поиск по подстроке (регистронезависимый).
page — номер страницы (по умолчанию 1).
limit — количество записей (по умолчанию 10).
3. Обновление (PATCH)
URL: http://localhost:3000/habbits/1
Body (JSON):
json
{
  "isCompleted": true
}


### 7 Запуск тестов
```bash

Все тесты:
npm run test:e2e  

Тесты только на habbits:
npx jest --config ./test/jest-e2e.json test/habbits.e2e-spec.ts   


### 8 Логирование

Можно изменить детализацию логов, отредактировав файл `.env` 

Логи пишутся только в файл в папке logs
LOG_TO_CONSOLE=false

Логи пишутся в файл в папке logs и в консоль
LOG_TO_CONSOLE=true