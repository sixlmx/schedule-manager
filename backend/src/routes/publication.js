import {
  deletePublication,
  getPublicationState,
  publishPeriodLessons,
  updatePublicationSettings,
} from '../controllers/publication.js';

export default async function publicationRoutes(fastify) {
  fastify.get('/publication', async (req, reply) => {
    const publicationState = await getPublicationState(fastify);
    reply.send(publicationState);
  });

  fastify.post('/publication', async (req, reply) => {
    const result = await publishPeriodLessons(fastify);
    reply.send(result);
  });

  fastify.delete('/publication', async (req, reply) => {
    const result = await deletePublication(fastify);
    reply.send(result);
  });

  fastify.patch('/publication/settings', async (req, reply) => {
    const result = await updatePublicationSettings(fastify, req.body);
    reply.send(result);
  });
}
