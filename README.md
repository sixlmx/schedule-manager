# schedule-manager

Веб-приложение для управления учебным расписанием.

## Стек

### Backend

- Node.js.
- Fastify.
- PostgreSQL.

### Frontend

- JavaScript.
- Vite.
- `frontend-admin` — административная часть.
- `frontend-public` — публичная часть.
- Собственный JSX/core **wood-js**: `h`, `Fragment`, `render`, `router`, `handlers`, `initWood`.
- CSS и CSS Modules.

### Tooling

- npm.
- ESLint.
- Stylelint.
- Makefile.

## Установка

Для Git Bash, WSL или Unix-like окружения:

```bash
make setup
```

Для Windows PowerShell:

```bash
make setup-windows
```

## Настройка базы данных

Для локальной работы нужна PostgreSQL.

Backend читает строку подключения из файла `backend/.env`:

```bash
CONNECTION_STRING=postgres://login:password@localhost/db-name
```

Создайте `backend/.env` на основе `backend/.env.example` и укажите подключение к локальной базе данных.

В репозитории есть `dbdump.txt` для подготовки локальной dev-базы.
