import { getPublishedGroupLessons } from '../controllers/publicLessons.js';
import { createGroup, deleteGroup, getGroups, updateGroup } from '../controllers/groups.js';

export default async function groupsRoutes(fastify) {
  fastify.get('/groups', async (req, reply) => {
    const groups = await getGroups(fastify);
    reply.send(groups);
  });

  fastify.get('/groups/lessons', async (req, reply) => {
    const lessons = await getPublishedGroupLessons(fastify, req.query);
    reply.send(lessons);
  });

  fastify.post('/groups', async (req, reply) => {
    const result = await createGroup(fastify, req.body);
    reply.status(201).send(result);
  });

  fastify.delete('/groups', async (req, reply) => {
    const groupId = req.body;
    const result = await deleteGroup(fastify, groupId);
    reply.status(201).send(result);
  });

  fastify.put('/groups', async (req, reply) => {
    const id = req.body;
    const result = await updateGroup(fastify, id);
    reply.status(201).send(result);
  });
}
