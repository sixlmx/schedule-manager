const timeToMinutes = (time) => {
  if (typeof time !== 'string') {
    throw new Error('Bell time must be a string');
  }

  const [hours, minutes] = time.split(':');
  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

  if (!Number.isInteger(totalMinutes)) {
    throw new Error('Bell time must use HH:mm or HH:mm:ss format');
  }

  return totalMinutes;
};

const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = restMinutes < 10 ? `0${restMinutes}` : `${restMinutes}`;

  return `${formattedHours}:${formattedMinutes}`;
};

export const buildDefaultBells = (templateBells, lessonsInDay) => {
  if (!Number.isInteger(lessonsInDay)) {
    throw new Error('Schedule lessonsInDay is required');
  }

  const firstBell = templateBells[0];
  const secondBell = templateBells[1];
  const firstStartMinutes = timeToMinutes(firstBell.startTime);
  const firstEndMinutes = timeToMinutes(firstBell.endTime);
  const secondStartMinutes = timeToMinutes(secondBell.startTime);
  const lessonDuration = firstEndMinutes - firstStartMinutes;
  const breakDuration = secondStartMinutes - firstEndMinutes;

  return Array.from({ length: lessonsInDay }, (_, index) => {
    const lessonNumber = index + 1;
    const startMinutes = firstStartMinutes + index * (lessonDuration + breakDuration);
    const endMinutes = startMinutes + lessonDuration;

    return {
      lessonNumber,
      startTime: minutesToTime(startMinutes),
      endTime: minutesToTime(endMinutes),
    };
  });
};
