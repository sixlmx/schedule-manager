import { publicLessonsQueries } from '../db/queries/publicLessons.js';

const getTimeMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const getEndDate = (startDate) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + 6);
  return date.toISOString().slice(0, 10);
};

const formatTeacherName = (name, teacherNameFormat) => {
  if (teacherNameFormat !== 'initials') {
    return name;
  }

  const [lastName, ...parts] = String(name).trim().split(/\s+/);
  const initials = parts
    .filter(Boolean)
    .map(part => `${part.at(0)}.`)
    .join('');

  return initials ? `${lastName} ${initials}` : name;
};

const getPublicationSettings = async (client) => {
  const { rows: [settings] } = await client.query(publicLessonsQueries.getPublicationSettings);

  return {
    isPublished: Boolean(settings?.isPublished),
    teacherNameFormat: settings?.teacherNameFormat ?? 'initials',
  };
};

const mapLesson = (row, settings) => {
  const teacherName = formatTeacherName(row.teacherName, settings.teacherNameFormat);

  return {
    id: row.id,
    weekday: row.weekday,
    lesson: row.lessonNumber,
    startTime: row.startTime.slice(0, 5),
    endTime: row.endTime.slice(0, 5),
    startTimeMin: getTimeMinutes(row.startTime),
    endTimeMin: getTimeMinutes(row.endTime),
    unionGroups: [
      {
        id: `${row.id}-group-${row.groupId}`,
        group: {
          id: row.groupId,
          name: row.groupName,
        },
        subgroup: null,
        divisionId: null,
        countDivisions: null,
      },
    ],
    teachers: [
      {
        id: row.teacherId,
        fio: teacherName,
        position: null,
        lessons: null,
        publication: null,
      },
    ],
    typeLesson: null,
    subject: {
      id: row.subjectId,
      name: row.subjectName,
      infoUrl: null,
      publication: null,
    },
    cabinet: row.classroom ? { name: row.classroom } : null,
  };
};

export const getPublishedTeacherLessons = async (fastify, { id, date }) => {
  const client = await fastify.pg.connect();

  try {
    const settings = await getPublicationSettings(client);
    const { rows: [teacher] } = await client.query(publicLessonsQueries.getTeacherById, [id]);
    const { rows } = await client.query(publicLessonsQueries.getByTeacherAndWeek, [id, date]);
    const lessons = rows.map(row => mapLesson(row, settings));
    const responseTeacher = rows[0]
      ? { id: rows[0].teacherId, fio: formatTeacherName(rows[0].teacherName, settings.teacherNameFormat), position: null }
      : teacher;

    return {
      startDate: date,
      endDate: getEndDate(date),
      teacher: responseTeacher,
      lessons,
    };
  }
  finally {
    client.release();
  }
};

export const getPublishedGroupLessons = async (fastify, { id, date }) => {
  const client = await fastify.pg.connect();

  try {
    const settings = await getPublicationSettings(client);
    const { rows: [group] } = await client.query(publicLessonsQueries.getGroupById, [id]);
    const { rows } = await client.query(publicLessonsQueries.getByGroupAndWeek, [id, date]);
    const lessons = rows.map(row => mapLesson(row, settings));
    const responseGroup = rows[0]
      ? { id: rows[0].groupId, name: rows[0].groupName }
      : group;

    return {
      startDate: date,
      endDate: getEndDate(date),
      group: responseGroup,
      lessons,
    };
  }
  finally {
    client.release();
  }
};
