import { publicationsQueries } from '../db/queries/publications.js';

export const getPublications = async (fastify) => {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(publicationsQueries.getPublishedSchedules);
    return rows;
  }
  finally {
    client.release();
  }
};

export const publishSchedule = async (fastify, scheduleId) => {
  const client = await fastify.pg.connect();

  try {
    const { rows: [schedule] } = await client.query(`
      SELECT id, name FROM schedules WHERE id = $1 AND type = 'period'
    `, [scheduleId]);

    if (!schedule) {
      return { type: 'error', message: 'Расписание не найдено или не является периодом' };
    }

    const { rows: lessons } = await client.query(`
      SELECT 
        weekday, lesson_number, classroom,
        group_id, group_name,
        teacher_id, teacher_name,
        subject_id, subject_name, subject_abbr
      FROM schedule_lessons
      WHERE schedule_id = $1
    `, [scheduleId]);

    if (lessons.length === 0) {
      return { type: 'error', message: 'Нет уроков для публикации' };
    }

    await client.query('BEGIN');

    await client.query(publicationsQueries.deleteByScheduleId, [scheduleId]);

    for (const lesson of lessons) {
      await client.query(publicationsQueries.insertPublishedLessons, [
        schedule.id, schedule.name,
        lesson.weekday, lesson.lesson_number, lesson.classroom,
        lesson.group_id, lesson.group_name,
        lesson.teacher_id, lesson.teacher_name,
        lesson.subject_id, lesson.subject_name, lesson.subject_abbr,
      ]);
    }

    await client.query('COMMIT');
    return { type: 'success', message: 'Расписание опубликовано!' };
  }
  catch (error) {
    await client.query('ROLLBACK');
    console.error('Error publishing schedule:', error);
    return { type: 'error', message: error.message };
  }
  finally {
    client.release();
  }
};

export const unpublishAll = async (fastify) => {
  const client = await fastify.pg.connect();
  try {
    await client.query('DELETE FROM published_lessons');
    return { type: 'success', message: 'Все публикации удалены' };
  }
  catch (error) {
    console.error('Error deleting all publications:', error);
    return { type: 'error', message: error.message };
  }
  finally {
    client.release();
  }
};
