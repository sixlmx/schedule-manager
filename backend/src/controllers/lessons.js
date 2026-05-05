import { lessonsQueries } from '../db/queries.js';

export const getLessonsByScheduleId = async (fastify, scheduleId) => {
  const client = await fastify.pg.connect();
  console.log(1, scheduleId);
  try {
    // Получаем уроки для конкретного расписания
    const { rows: lessons } = await client.query(`
      SELECT 
        l.id,
        l.weekday,
        l.lesson_number as "lessonNumber",
        l.classroom,
        l.group_id as "groupId",
        g.name as "groupName",
        g.abbreviation as "groupAbbr",
        l.subject_id as "subjectId",
        sub.name as "subjectName",
        sub.abbreviation as "subjectAbbr",
        l.teacher_id as "teacherId",
        t.fio as "teacherName",
        t.position as "teacherPosition"
      FROM lessons l
      JOIN groups g ON l.group_id = g.id
      JOIN subjects sub ON l.subject_id = sub.id
      JOIN teachers t ON l.teacher_id = t.id
      WHERE l.schedule_id = $1
      ORDER BY l.group_id, l.weekday, l.lesson_number
    `, [scheduleId]);

    // Получаем информацию о расписании
    const { rows: scheduleInfo } = await client.query(`
      SELECT id, name, lessons_in_day as "lessonsInDay", weekdays
      FROM schedules
      WHERE id = $1
    `, [scheduleId]);

    // Получаем все группы (для фильтра)
    const { rows: groups } = await client.query(`
      SELECT id, name, abbreviation
      FROM groups
      ORDER BY name
    `);

    // Получаем все предметы
    const { rows: subjects } = await client.query(`
      SELECT id, name, abbreviation
      FROM subjects
      ORDER BY name
    `);

    // Получаем всех учителей
    const { rows: teachers } = await client.query(`
      SELECT id, fio, position, color
      FROM teachers
      ORDER BY fio
    `);

    return {
      schedule: scheduleInfo[0],
      lessons,
      groups,
      subjects,
      teachers,
    };
  }
  finally {
    client.release();
  }
};

// Новые функции для CRUD нагрузки
export const getLessons = async (fastify) => {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(lessonsQueries.getAll);
    return rows;
  }
  finally {
    client.release();
  }
};

export const createLesson = async (fastify, data) => {
  const client = await fastify.pg.connect();
  try {
    const result = await client.query(lessonsQueries.create, [
      data.groupId,
      data.teacherId,
      data.subjectId,
      data.lessonsCount,
    ]);
    return { message: 'Урок добавлен!', id: result.rows[0]?.id };
  }
  catch (error) {
    console.error('Error creating lesson:', error);
    throw new Error('Не удалось создать урок');
  }
  finally {
    client.release();
  }
};

export const updateLesson = async (fastify, data) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(lessonsQueries.update, [
      data.groupId,
      data.teacherId,
      data.subjectId,
      data.lessonsCount,
      data.id,
    ]);
    return { message: 'Урок обновлен!' };
  }
  finally {
    client.release();
  }
};

export const deleteLesson = async (fastify, lessonId) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(lessonsQueries.delete, [lessonId]);
    return { message: 'Урок удален!' };
  }
  finally {
    client.release();
  }
};