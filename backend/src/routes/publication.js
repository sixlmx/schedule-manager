import {
  clearPublishedLessons,
  getPublicationState,
  publishPeriodLessons,
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
    const result = await clearPublishedLessons(fastify);
    reply.send(result);
  });
}
