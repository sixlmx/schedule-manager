import { createWorkload, deleteWorkload, getWorkloadByScheduleId } from '../controllers/workloads.js';
import { decrementWorkload } from '../controllers/workloads.js';

export default async function workloadsRoutes(fastify) {
  fastify.get('/workloads/schedule/:scheduleId', async (req, reply) => {
    const { scheduleId } = req.params;
    const workloads = await getWorkloadByScheduleId(fastify, scheduleId);
    reply.send(workloads);
  });

  fastify.post('/workloads', async (req, reply) => {
    const result = await createWorkload(fastify, req.body);
    reply.status(201).send(result);
  });

  fastify.patch('/workloads/:id/decrement', async (req, reply) => {
    const { id } = req.params;
    const result = await decrementWorkload(fastify, parseInt(id, 10));
    reply.send(result);
  });

  fastify.delete('/workloads', async (req, reply) => {
    const workloadId = req.body;
    const result = await deleteWorkload(fastify, workloadId);
    reply.send(result);
  });
}
