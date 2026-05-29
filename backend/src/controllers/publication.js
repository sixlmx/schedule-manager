import { publicationQueries } from '../db/queries/publication.js';

const getPublicationStateByClient = async (client) => {
  const { rows: publishedSchedules } = await client.query(publicationQueries.getPublishedSchedules);
  const { rows: [summary] } = await client.query(publicationQueries.getLastPublishedAt);

  return {
    lastPublishedAt: summary.lastPublishedAt,
    publishedSchedules,
  };
};

export const getPublicationState = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    return await getPublicationStateByClient(client);
  }
  finally {
    client.release();
  }
};

export const publishPeriodLessons = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    await client.query('BEGIN');

    const { rows: [sourceSummary] } = await client.query(publicationQueries.getPeriodLessonsSummary);

    await client.query(publicationQueries.clearPublishedLessons);

    const { rows: [result] } = await client.query(publicationQueries.insertPeriodLessonsSnapshot);

    if (result.publishedLessonsCount !== sourceSummary.lessonsCount) {
      throw new Error('Не удалось опубликовать все уроки: проверьте звонки period-расписаний');
    }

    const publicationState = await getPublicationStateByClient(client);

    await client.query('COMMIT');

    return {
      type: result.publishedLessonsCount > 0 ? 'success' : 'info',
      message: result.publishedLessonsCount > 0
        ? 'Публикация обновлена'
        : 'Нет period-уроков для публикации',
      publishedSchedulesCount: result.publishedSchedulesCount,
      publishedLessonsCount: result.publishedLessonsCount,
      ...publicationState,
    };
  }
  catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  finally {
    client.release();
  }
};

export const clearPublishedLessons = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    await client.query(publicationQueries.clearPublishedLessons);

    return {
      type: 'success',
      message: 'Опубликованные расписания удалены',
      lastPublishedAt: null,
      publishedSchedules: [],
    };
  }
  finally {
    client.release();
  }
};
