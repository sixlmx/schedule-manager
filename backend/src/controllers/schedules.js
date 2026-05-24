import { bellsQueries } from '../db/queries/bells.js';
import { schedulesQueries } from '../db/queries/schedules.js';
import { buildDefaultBells } from '../utils/defaultBells.js';

export const getSchedules = async (fastify) => {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(schedulesQueries.getAll);
    return rows;
  }
  finally {
    client.release();
  }
};

export const createSchedule = async (fastify, data) => {
  const client = await fastify.pg.connect();
  try {
    const { rows: [schedule] } = await client.query(schedulesQueries.create, [
      data.name,
      data.lessonsInDay,
      data.type,
      data.startDate,
      data.weekdays,
    ]);

    const defaultBells = buildDefaultBells(schedule.lessonsInDay);

    for (const bell of defaultBells) {
      await client.query(bellsQueries.upsert, [
        schedule.id,
        bell.lessonNumber,
        bell.startTime,
        bell.endTime,
      ]);
    }

    return { message: 'Расписание добавлено!' };
  }
  finally {
    client.release();
  }
};

export const updateSchedule = async (fastify, data) => {
  const client = await fastify.pg.connect();

  try {
    await client.query(schedulesQueries.update, [
      data.name,
      data.lessonsInDay,
      data.weekdays,
      data.id,
    ]);
    return { message: 'Данные расписания обновлены!' };
  }
  finally {
    client.release();
  }
};

export const deleteSchedule = async (fastify, scheduleId) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(schedulesQueries.delete, [scheduleId]);
    return { message: 'Расписание удалено!' };
  }
  finally {
    client.release();
  }
};
