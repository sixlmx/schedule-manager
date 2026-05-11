import { bellsQueries } from '../db/queries.js';

export const getBellsByScheduleId = async (fastify, scheduleId) => {
  const client = await fastify.pg.connect();
  try {
    const { rows: scheduleInfo } = await client.query(bellsQueries.getScheduleById, [scheduleId]);
    const { rows: bells } = await client.query(bellsQueries.getByScheduleId, [scheduleId]);

    return {
      schedule: scheduleInfo[0],
      bells,
    };
  }
  finally {
    client.release();
  }
};

export const updateBellsByScheduleId = async (fastify, scheduleId, bells) => {
  const client = await fastify.pg.connect();
  try {
    await client.query('BEGIN');

    await Promise.all(bells.map(bell => client.query(bellsQueries.upsert, [
      scheduleId,
      bell.lessonNumber,
      bell.startTime,
      bell.endTime,
    ])));

    await client.query(bellsQueries.deleteExtra, [scheduleId, bells.length]);
    await client.query('COMMIT');

    return { message: 'Звонки обновлены!' };
  }
  catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  finally {
    client.release();
  }
};
