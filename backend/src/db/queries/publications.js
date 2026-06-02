export const publicationsQueries = {
  deleteByScheduleId: `
    DELETE FROM published_lessons WHERE schedule_id = $1
  `,

  insertPublishedLessons: `
    INSERT INTO published_lessons (
      schedule_id, schedule_name,
      weekday, lesson_number, classroom,
      group_id, group_name,
      teacher_id, teacher_name,
      subject_id, subject_name, subject_abbr
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `,

  getPublishedSchedules: `
  SELECT DISTINCT
    pl.schedule_id,
    pl.schedule_name,
    MIN(pl.published_at) as published_at,
    s.start_date
  FROM published_lessons pl
  JOIN schedules s ON pl.schedule_id = s.id
  GROUP BY pl.schedule_id, pl.schedule_name, s.start_date
  ORDER BY published_at DESC
`,

  getPublishedLessons: `
    SELECT 
      weekday, lesson_number, classroom,
      group_id, group_name,
      teacher_id, teacher_name,
      subject_id, subject_name, subject_abbr
    FROM published_lessons
    WHERE schedule_id = $1
    ORDER BY group_name, weekday, lesson_number
  `,
};
