export const publicLessonsQueries = {
  getPublicationSettings: `
    SELECT
      is_published as "isPublished",
      teacher_name_format as "teacherNameFormat"
    FROM publication_settings
    WHERE public_id = $1
    LIMIT 1
  `,

  getTeacherById: `
    SELECT id, COALESCE(fio, name) as fio, position
    FROM teachers
    WHERE id = $1
  `,

  getGroupById: `
    SELECT id, name
    FROM groups
    WHERE id = $1
  `,

  getByTeacherAndWeek: `
    SELECT
      source_schedule_lesson_id::text as id,
      week_start_date::text as "weekStartDate",
      weekday,
      lesson_number as "lessonNumber",
      start_time::text as "startTime",
      end_time::text as "endTime",
      teacher_id as "teacherId",
      teacher_name as "teacherName",
      group_id as "groupId",
      group_name as "groupName",
      subject_id as "subjectId",
      subject_name as "subjectName",
      classroom
    FROM published_lessons
    WHERE
      teacher_id = $1
      AND week_start_date = $2::date
      AND EXISTS (
        SELECT 1
        FROM publication_settings
        WHERE public_id = $3 AND is_published = true
      )
    ORDER BY weekday, lesson_number, group_name
  `,

  getByGroupAndWeek: `
    SELECT
      source_schedule_lesson_id::text as id,
      week_start_date::text as "weekStartDate",
      weekday,
      lesson_number as "lessonNumber",
      start_time::text as "startTime",
      end_time::text as "endTime",
      teacher_id as "teacherId",
      teacher_name as "teacherName",
      group_id as "groupId",
      group_name as "groupName",
      subject_id as "subjectId",
      subject_name as "subjectName",
      classroom
    FROM published_lessons
    WHERE
      group_id = $1
      AND week_start_date = $2::date
      AND EXISTS (
        SELECT 1
        FROM publication_settings
        WHERE public_id = $3 AND is_published = true
      )
    ORDER BY weekday, lesson_number, teacher_name
  `,
};
