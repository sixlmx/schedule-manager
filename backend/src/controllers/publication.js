import { randomUUID } from 'node:crypto';
import { publicationQueries } from '../db/queries/publication.js';

const DEFAULT_SETTINGS = {
  schoolName: '',
  schoolWebsiteUrl: '',
  teacherNameFormat: 'initials',
};

const PUBLICATION_PATH_PREFIX = '/public/publications';

const normalizeTeacherNameFormat = value => (
  value === 'full' || value === 'initials' ? value : DEFAULT_SETTINGS.teacherNameFormat
);

const normalizeSettingsPayload = data => ({
  schoolName: String(data?.schoolName ?? '').trim(),
  schoolWebsiteUrl: String(data?.schoolWebsiteUrl ?? '').trim(),
  teacherNameFormat: normalizeTeacherNameFormat(data?.teacherNameFormat),
});

const buildPublicPath = settings => (
  settings?.isPublished && settings?.publicId ? `${PUBLICATION_PATH_PREFIX}/${settings.publicId}` : ''
);

const normalizeSettings = settings => ({
  id: settings?.id ?? null,
  publicId: settings?.publicId ?? null,
  isPublished: Boolean(settings?.isPublished),
  schoolName: settings?.schoolName ?? DEFAULT_SETTINGS.schoolName,
  schoolWebsiteUrl: settings?.schoolWebsiteUrl ?? DEFAULT_SETTINGS.schoolWebsiteUrl,
  teacherNameFormat: normalizeTeacherNameFormat(settings?.teacherNameFormat),
  lastPublishedAt: settings?.isPublished ? settings.lastPublishedAt : null,
});

const getSettingsByClient = async (client) => {
  const { rows: [settings] } = await client.query(publicationQueries.getSettings);
  return normalizeSettings(settings);
};

const ensureSettingsByClient = async (client) => {
  const settings = await getSettingsByClient(client);

  if (settings.id) {
    return settings;
  }

  const { rows: [createdSettings] } = await client.query(publicationQueries.createSettings, [randomUUID()]);
  return normalizeSettings(createdSettings);
};

const getPublicationStateByClient = async (client) => {
  const settings = await getSettingsByClient(client);
  const { rows } = await client.query(publicationQueries.getPublishedSchedules);
  const publishedSchedules = settings.isPublished ? rows : [];

  return {
    isPublished: settings.isPublished,
    publicPath: buildPublicPath(settings),
    publicUrl: buildPublicPath(settings),
    lastPublishedAt: settings.lastPublishedAt,
    settings: {
      schoolName: settings.schoolName,
      schoolWebsiteUrl: settings.schoolWebsiteUrl,
      teacherNameFormat: settings.teacherNameFormat,
    },
    publishedSchedules,
  };
};

export const getPublicationState = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    return await getPublicationStateByClient(client);
  }
  finally {
    client.release();
  }
};

export const publishPeriodLessons = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    await client.query('BEGIN');

    const settings = await ensureSettingsByClient(client);
    const { rows: [sourceSummary] } = await client.query(publicationQueries.getPeriodLessonsSummary);

    await client.query(publicationQueries.clearSnapshot);

    const { rows: [result] } = await client.query(publicationQueries.insertPeriodLessonsSnapshot);

    if (result.publishedLessonsCount !== sourceSummary.lessonsCount) {
      throw new Error('Не удалось опубликовать все уроки: проверьте звонки period-расписаний');
    }

    const hasPublishedLessons = result.publishedLessonsCount > 0;
    await client.query(publicationQueries.markPublished, [
      hasPublishedLessons,
      hasPublishedLessons ? result.lastPublishedAt : null,
      settings.id,
    ]);

    const publicationState = await getPublicationStateByClient(client);

    await client.query('COMMIT');

    return {
      type: hasPublishedLessons ? 'success' : 'info',
      message: hasPublishedLessons
        ? 'Публикация обновлена'
        : 'Нет period-уроков для публикации',
      publishedSchedulesCount: result.publishedSchedulesCount,
      publishedLessonsCount: result.publishedLessonsCount,
      ...publicationState,
    };
  }
  catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  finally {
    client.release();
  }
};

export const deletePublication = async (fastify) => {
  const client = await fastify.pg.connect();

  try {
    await client.query('BEGIN');

    const settings = await ensureSettingsByClient(client);
    await client.query(publicationQueries.clearSnapshot);
    await client.query(publicationQueries.markPublished, [false, null, settings.id]);

    const publicationState = await getPublicationStateByClient(client);

    await client.query('COMMIT');

    return {
      type: 'success',
      message: 'Публикация удалена',
      ...publicationState,
    };
  }
  catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  finally {
    client.release();
  }
};

export const updatePublicationSettings = async (fastify, data) => {
  const client = await fastify.pg.connect();

  try {
    await client.query('BEGIN');

    const currentSettings = await ensureSettingsByClient(client);
    const settings = normalizeSettingsPayload(data);

    await client.query(publicationQueries.saveSettings, [
      settings.schoolName,
      settings.schoolWebsiteUrl,
      settings.teacherNameFormat,
      currentSettings.id,
    ]);

    const publicationState = await getPublicationStateByClient(client);

    await client.query('COMMIT');

    return {
      type: 'success',
      message: 'Настройки публикации сохранены',
      ...publicationState,
    };
  }
  catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  finally {
    client.release();
  }
};
