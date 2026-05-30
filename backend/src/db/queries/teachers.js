export const teachersQueries = {
  getAll: 'SELECT * FROM teachers ORDER BY id',
  create: 'INSERT INTO teachers (name, fio, position, color) VALUES ($1, $2, $3, $4) RETURNING *',
  update: 'UPDATE teachers SET name = $1, fio = $2, position = $3,  color = $4 WHERE id = $5 RETURNING *',
  delete: 'DELETE FROM teachers WHERE id = $1',
};
