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

## Настройка базы данных

Для локальной работы нужна PostgreSQL.

Backend читает строку подключения из файла `backend/.env`:

```bash
CONNECTION_STRING=postgres://login:password@localhost/db-name
```

Создайте `backend/.env` на основе `backend/.env.example` и укажите подключение к локальной базе данных.

В репозитории есть `dbdump.txt` для подготовки локальной dev-базы. Команда восстановления dump уточняется отдельно.
