import { workloadsQueries } from '../db/queries/workloads.js';

export const getWorkloadByScheduleId = async (fastify, scheduleId) => {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(workloadsQueries.getByScheduleId, [scheduleId]);
    return rows;
  }
  finally {
    client.release();
  }
};

export const createWorkload = async (fastify, data) => {
  const client = await fastify.pg.connect();
  try {
    const result = await client.query(workloadsQueries.create, [
      data.scheduleId,
      data.groupId,
      data.teacherId,
      data.subjectId,
      data.lessonsPerWeek,
    ]);
    return { type: 'success', message: 'Нагрузка добавлена!', id: result.rows[0]?.id };
  }
  catch (error) {
    console.error('Error creating workload:', error);
    return { type: 'error', message: error.message };
  }
  finally {
    client.release();
  }
};

export const decrementWorkload = async (fastify, workloadId) => {
  const client = await fastify.pg.connect();
  try {
    const { rows: [workload] } = await client.query(
      workloadsQueries.findById,
      [workloadId],
    );

    if (!workload) {
      return { type: 'error', message: 'Нагрузка не найдена' };
    }

    if (workload.lessons_per_week === 1) {
      await client.query(workloadsQueries.delete, [workloadId]);
      return { type: 'success', message: 'Нагрузка полностью использована и удалена' };
    }

    const { rows: [updated] } = await client.query(
      workloadsQueries.decrement,
      [workloadId],
    );

    return {
      type: 'success',
      message: 'Осталось пар: ' + updated.lessons_per_week,
    };
  }
  catch (error) {
    console.error('Error decrementing workload:', error);
    return { type: 'error', message: error.message };
  }
  finally {
    client.release();
  }
};

export const deleteWorkload = async (fastify, workloadId) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(workloadsQueries.delete, [workloadId]);
    return { type: 'success', message: 'Нагрузка удалена!' };
  }
  catch (error) {
    console.error('Error deleting workload:', error);
    return { type: 'error', message: error.message };
  }
  finally {
    client.release();
  }
};
