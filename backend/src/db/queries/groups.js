export const groupsQueries = {
  getAll: `
    SELECT
      id,
      name,
      abbreviation,
      year_of_admission as "yearOfAdmission",
      color
    FROM groups
    ORDER BY id
  `,
  create: 'INSERT INTO groups (name, year_of_admission, abbreviation, color) VALUES ($1, $2, $3, $4) RETURNING *',
  update: 'UPDATE groups SET name = $1, abbreviation = $2, year_of_admission = $3, color = $4 WHERE id = $5 RETURNING *',
  delete: 'DELETE FROM groups WHERE id = $1',
};
