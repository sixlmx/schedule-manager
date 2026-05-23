# schedule-manager-vanilla

## Описание проекта

`schedule-manager-vanilla` — веб-приложение для управления учебным расписанием.

Проект включает:

- административную часть для работы с расписаниями;
- публичную часть для просмотра расписания;
- CRUD-разделы для преподавателей, групп, предметов и аудиторий;
- работу со звонками, нагрузками и размещением уроков в расписании;
- API между frontend-приложениями и backend через `/apiv1`.

Публичная часть сейчас ориентирована на просмотр расписания по преподавателям и группам.

## Стек

### Backend

- Node.js.
- Fastify.
- PostgreSQL.
- `pg` и `@fastify/postgres` для подключения к базе данных.
- `@fastify/static` для раздачи собранных frontend-приложений.
- Слои backend: routes, controllers, db queries.

### Frontend

- JavaScript без TypeScript.
- Vite.
- `frontend-admin` — административная часть.
- `frontend-public` — публичная часть.
- Собственный JSX/core: `h`, `Fragment`, `render`, `router`, `handlers`, `initWood`.
- CSS и CSS Modules.

### Tooling

- npm.
- ESLint flat config.
- `@eslint/js`.
- `@stylistic/eslint-plugin`.
- Stylelint.
- Makefile с командами для запуска backend/frontend и pre-push checks.

## Установка

Установите зависимости во всех частях проекта:

```bash
make setup
```

Команда устанавливает зависимости через `npm ci` в корне проекта, `backend`, `frontend-admin` и `frontend-public`.

Если `make` недоступен, выполните команды вручную:

```bash
npm ci
cd backend && npm ci
cd ../frontend-admin && npm ci
cd ../frontend-public && npm ci
```

## Настройка базы данных

Для локальной работы нужна PostgreSQL.

Backend читает строку подключения из файла `backend/.env`:

```bash
CONNECTION_STRING=postgres://login:password@localhost/db-name
```

Создайте `backend/.env` на основе `backend/.env.example` и укажите подключение к локальной базе данных.

В репозитории есть `dbdump.txt` для подготовки локальной dev-базы. Команда восстановления dump уточняется отдельно.

## Запуск backend

Из корня проекта:

```bash
cd backend
node src/index.js
```

После запуска backend локально слушает `http://localhost:3000`. Это локальный backend/API, а не публичный сайт.

## Запуск frontend-admin

```bash
cd frontend-admin
npm run dev
```

Vite покажет локальный URL в терминале. Базовый путь административной части: `/admin`.

## Запуск frontend-public

```bash
cd frontend-public
npm run dev
```

Vite покажет локальный URL в терминале. Базовый путь публичной части: `/public`.

## Проверки

Подтверждённые команды сборки frontend-приложений:

```bash
cd frontend-admin
npm run build
```

```bash
cd frontend-public
npm run build
```

Перед сдачей изменений также полезно проверить diff:

```bash
git diff --check
```

Makefile содержит pre-push checks, но перед использованием этих команд нужно проверить актуальность npm scripts.

## Документация

Общая документация организации находится в репозитории:

https://github.com/sixlmx/documentation
