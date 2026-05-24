export const classesQueries = {
  getAll: 'SELECT id, name, abbreviation, capacity, building FROM classes ORDER BY id',
  create: 'INSERT INTO classes (name, abbreviation, capacity, building) VALUES ($1, $2, $3, $4)',
  update: 'UPDATE classes SET name = $1, abbreviation = $2, capacity = $3, building = $4 WHERE id = $5',
  delete: 'DELETE FROM classes WHERE id = $1',
};
