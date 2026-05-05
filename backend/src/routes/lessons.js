import { createLesson, getLessons, updateLesson, deleteLesson, getLessonsByScheduleId } from '../controllers/lessons.js';

export default async function lessonsRoutes(fastify) {
  // Получить все уроки (нагрузку)
  fastify.get('/lessons', async (req, reply) => {
    const lessons = await getLessons(fastify);
    reply.send(lessons);
  });

  // Получить уроки по расписанию
  fastify.get('/lessons/schedule/:scheduleId', async (req, reply) => {
    const { scheduleId } = req.params;
    const lessons = await getLessonsByScheduleId(fastify, scheduleId);
    reply.send(lessons);
  });

  // Создать урок (нагрузку)
  fastify.post('/lessons', async (req, reply) => {
    const result = await createLesson(fastify, req.body);
    reply.status(201).send(result);
  });

  // Обновить урок
  fastify.put('/lessons', async (req, reply) => {
    const result = await updateLesson(fastify, req.body);
    reply.send(result);
  });

  // Удалить урок
  fastify.delete('/lessons', async (req, reply) => {
    const lessonId = req.body;
    const result = await deleteLesson(fastify, lessonId);
    reply.send(result);
  });
}
