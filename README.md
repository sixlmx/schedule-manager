# schedule-manager

Веб-приложение для управления учебным расписанием.

## Стек

### Backend

- Node.js.
- Fastify.
- PostgreSQL.
- `pg` и `@fastify/postgres` для подключения к базе данных.
- `@fastify/static` для раздачи собранных frontend-приложений.
- Слои backend: routes, controllers, db queries.

### Frontend

- JavaScript.
- Vite.
- `frontend-admin` — административная часть.
- `frontend-public` — публичная часть.
- Собственный JSX/core **wood-js**: `h`, `Fragment`, `render`, `router`, `handlers`, `initWood`.
- CSS и CSS Modules.

### Tooling

- npm.
- ESLint flat config.
- `@eslint/js`.
- `@stylistic/eslint-plugin`.
- Stylelint.
- Makefile с командами для запуска backend/frontend и pre-push checks.

## Установка

Для Git Bash, WSL или Unix-like окружения:

```bash
make setup
```

Для Windows PowerShell:

```bash
make setup-windows
```

Обе команды устанавливают зависимости через `npm ci` во всех npm-зонах проекта и настраивают pre-push hook.

Если `make` недоступен, установите зависимости вручную:

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

В репозитории есть `dbdump.txt` для подготовки локальной dev-базы.
