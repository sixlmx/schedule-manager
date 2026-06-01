import { groupsQueries } from '../db/queries/groups.js';

export const getGroups = async (fastify) => {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(groupsQueries.getAll);
    return rows;
  }
  finally {
    client.release();
  }
};

export const createGroup = async (fastify, data) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(groupsQueries.create, [
      data.name,
      data.yearOfAdmission,
      data.abbreviation,
      data.color || '#3b82f6',
    ]);
    return { message: 'Группа добавлена!' };
  }
  finally {
    client.release();
  }
};

export const updateGroup = async (fastify, data) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(groupsQueries.update, [
      data.name,
      data.abbreviation,
      data.yearOfAdmission,
      data.color || '#3b82f6',
      data.id,
    ]);
    return { message: 'Данные группы обновлены!' };
  }
  finally {
    client.release();
  }
};

export const deleteGroup = async (fastify, groupId) => {
  const client = await fastify.pg.connect();
  try {
    await client.query(groupsQueries.delete, [groupId]);
    return { message: 'Группа удалена!' };
  }
  finally {
    client.release();
  }
};
