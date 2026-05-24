export const schedulesQueries = {
  getAll: 'SELECT id, name, created, lessons_in_day as "lessonsInDay", weekdays FROM schedules ORDER BY id',
  create: `
    INSERT INTO schedules (name, lessons_in_day, type, start_date, weekdays)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `,
  update: 'UPDATE schedules SET name = $1, lessons_in_day = $2, weekdays = $3 WHERE id = $4',
  delete: 'DELETE FROM schedules WHERE id = $1',
};
