export const publicationQueries = {
  getSettings: `
    SELECT
      id,
      public_id as "publicId",
      is_published as "isPublished",
      school_name as "schoolName",
      school_website_url as "schoolWebsiteUrl",
      teacher_name_format as "teacherNameFormat",
      last_published_at as "lastPublishedAt",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM publication_settings
    ORDER BY id
    LIMIT 1
  `,

  createSettings: `
    INSERT INTO publication_settings (public_id)
    VALUES ($1)
    RETURNING
      id,
      public_id as "publicId",
      is_published as "isPublished",
      school_name as "schoolName",
      school_website_url as "schoolWebsiteUrl",
      teacher_name_format as "teacherNameFormat",
      last_published_at as "lastPublishedAt",
      created_at as "createdAt",
      updated_at as "updatedAt"
  `,

  saveSettings: `
    UPDATE publication_settings
    SET
      school_name = $1,
      school_website_url = $2,
      teacher_name_format = $3,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING
      id,
      public_id as "publicId",
      is_published as "isPublished",
      school_name as "schoolName",
      school_website_url as "schoolWebsiteUrl",
      teacher_name_format as "teacherNameFormat",
      last_published_at as "lastPublishedAt",
      created_at as "createdAt",
      updated_at as "updatedAt"
  `,

  markPublished: `
    UPDATE publication_settings
    SET
      is_published = $1,
      last_published_at = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING
      id,
      public_id as "publicId",
      is_published as "isPublished",
      school_name as "schoolName",
      school_website_url as "schoolWebsiteUrl",
      teacher_name_format as "teacherNameFormat",
      last_published_at as "lastPublishedAt",
      created_at as "createdAt",
      updated_at as "updatedAt"
  `,

  getPublishedSchedules: `
    SELECT
      source_schedule_id as "sourceScheduleId",
      schedule_name as "name",
      week_start_date::text as "weekStartDate",
      MAX(published_at) as "publishedAt",
      COUNT(*)::integer as "lessonsCount"
    FROM published_lessons
    GROUP BY source_schedule_id, schedule_name, week_start_date
    ORDER BY week_start_date DESC, schedule_name
  `,

  getPeriodLessonsSummary: `
    SELECT
      COUNT(DISTINCT s.id)::integer as "schedulesCount",
      COUNT(*)::integer as "lessonsCount"
    FROM schedules s
    JOIN schedule_lessons sl ON sl.schedule_id = s.id
    WHERE s.type = 'period'
  `,

  clearSnapshot: 'DELETE FROM published_lessons',

  insertPeriodLessonsSnapshot: `
    WITH inserted AS (
      INSERT INTO published_lessons (
        source_schedule_id,
        source_schedule_lesson_id,
        schedule_name,
        week_start_date,
        lesson_date,
        weekday,
        lesson_number,
        start_time,
        end_time,
        teacher_id,
        teacher_name,
        group_id,
        group_name,
        group_abbr,
        subject_id,
        subject_name,
        subject_abbr,
        classroom,
        published_at
      )
      SELECT
        s.id,
        sl.id,
        s.name,
        s.start_date,
        (s.start_date + ((sl.weekday - 1) * INTERVAL '1 day'))::date,
        sl.weekday,
        sl.lesson_number,
        b.start_time,
        b.end_time,
        sl.teacher_id,
        sl.teacher_name,
        sl.group_id,
        sl.group_name,
        sl.group_abbr,
        sl.subject_id,
        sl.subject_name,
        sl.subject_abbr,
        sl.classroom,
        CURRENT_TIMESTAMP
      FROM schedules s
      JOIN schedule_lessons sl ON sl.schedule_id = s.id
      JOIN bells b ON b.schedule_id = sl.schedule_id AND b.lesson_number = sl.lesson_number
      WHERE s.type = 'period'
      ORDER BY s.id, sl.weekday, sl.lesson_number, sl.group_name
      RETURNING source_schedule_id, published_at
    )
    SELECT
      COUNT(DISTINCT source_schedule_id)::integer as "publishedSchedulesCount",
      COUNT(*)::integer as "publishedLessonsCount",
      MAX(published_at) as "lastPublishedAt"
    FROM inserted
  `,
};
