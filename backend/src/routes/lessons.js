import { getLessonsByScheduleId, deleteLesson, setLesson } from '../controllers/lessons.js';

export default async function scheduleLessonsRoutes(fastify) {
  fastify.get('/lessons/schedule/:scheduleId', async (req, reply) => {
    const { scheduleId } = req.params;
    const scheduleLessons = await getLessonsByScheduleId(fastify, scheduleId);
    reply.send(scheduleLessons);
  });

  fastify.post('/lessons', async (req, reply) => {
    const result = await setLesson(fastify, req.body);
    reply.status(201).send(result);
  });

  fastify.delete('/lessons', async (req, reply) => {
    const scheduleLessonId = req.body;
    const result = await deleteLesson(fastify, scheduleLessonId);
    reply.send(result);
  });
}
