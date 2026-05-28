import { getPublishedTeacherLessons } from '../controllers/publicLessons.js';
import { getTeachers, createTeacher, deleteTeacher, updateTeacher } from '../controllers/teachers.js';

export default async function teachersRoutes(fastify) {
  fastify.get('/teachers', async (req, reply) => {
    const teachers = await getTeachers(fastify);
    reply.send(teachers);
  });

  fastify.get('/teachers/lessons', async (req, reply) => {
    const lessons = await getPublishedTeacherLessons(fastify, req.query);
    reply.send(lessons);
  });

  fastify.post('/teachers', async (req, reply) => {
    const result = await createTeacher(fastify, req.body);
    reply.status(201).send(result);
  });

  fastify.put('/teachers', async (req, reply) => {
    const result = await updateTeacher(fastify, req.body);
    reply.status(201).send(result);
  });

  fastify.delete('/teachers', async (req, reply) => {
    const teacherId = req.body;
    const result = await deleteTeacher(fastify, teacherId);
    reply.status(201).send(result);
  });
}
