export const buildBellRows = (bells, lessonsInDay) => {
  const rowsCount = Number(lessonsInDay);

  if (!Number.isInteger(rowsCount)) {
    throw new Error('Schedule lessonsInDay is required');
  }

  return Array.from({ length: rowsCount }, (_, index) => {
    const lessonNumber = index + 1;
    const bell = bells.find(item => item.lessonNumber === lessonNumber);

    return {
      lessonNumber,
      startTime: bell ? bell.startTime : '',
      endTime: bell ? bell.endTime : '',
    };
  });
};

export const timeToMinutes = (time) => {
  if (!time) return null;

  const [hours, minutes] = String(time).split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;

  return hours * 60 + minutes;
};

export const formatTime = (time) => {
  if (!time) return '';

  return String(time).slice(0, 5);
};

export const formatDuration = (startTime, endTime) => {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  if (start === null || end === null) return '';

  return `${end - start} мин`;
};
