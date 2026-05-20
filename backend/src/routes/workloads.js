// routes/workloads.js
import { createWorkload, updateWorkload, deleteWorkload, getWorkloadByScheduleId } from '../controllers/workloads.js';

export default async function workloadsRoutes(fastify) {
  fastify.get('/workloads/schedule/:scheduleId', async (req, reply) => {
    const { scheduleId } = req.params;
    const workloads = await getWorkloadByScheduleId(fastify, scheduleId);
    reply.send(workloads);
  });

  // Создать нагрузку
  fastify.post('/workloads', async (req, reply) => {
    const result = await createWorkload(fastify, req.body);
    reply.status(201).send(result);
  });

  // Обновить нагрузку
  fastify.put('/workloads', async (req, reply) => {
    const result = await updateWorkload(fastify, req.body);
    reply.send(result);
  });

  // Удалить нагрузку
  fastify.delete('/workloads', async (req, reply) => {
    const workloadId = req.body;
    const result = await deleteWorkload(fastify, workloadId);
    reply.send(result);
  });
}
