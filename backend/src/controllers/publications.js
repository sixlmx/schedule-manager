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

export const publishSchedules = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    // Находим все расписания типа 'period', которых нет в published_lessons
    const { rows: schedules } = await client.query(`
      SELECT id, name 
      FROM schedules 
      WHERE type = 'period' 
        AND id NOT IN (SELECT DISTINCT schedule_id FROM published_lessons)
    `);

    if (schedules.length === 0) {
      return { type: 'error', message: 'Нет новых расписаний для публикации' };
    }

    await client.query('BEGIN');

    for (const schedule of schedules) {
      const { rows: lessons } = await client.query(`
        SELECT 
          weekday, lesson_number, classroom,
          group_id, group_name,
          teacher_id, teacher_name,
          subject_id, subject_name, subject_abbr
        FROM schedule_lessons
        WHERE schedule_id = $1
      `, [schedule.id]);

      if (lessons.length === 0) continue;

      for (const lesson of lessons) {
        await client.query(publicationsQueries.insertPublishedLessons, [
          schedule.id, schedule.name,
          lesson.weekday, lesson.lesson_number, lesson.classroom,
          lesson.group_id, lesson.group_name,
          lesson.teacher_id, lesson.teacher_name,
          lesson.subject_id, lesson.subject_name, lesson.subject_abbr,
        ]);
      }
    }

    await client.query('COMMIT');
    return { type: 'success', message: 'Новые расписания опубликованы!' };
  }
  catch (error) {
    await client.query('ROLLBACK');
    console.error('Error publishing schedules:', error);
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
