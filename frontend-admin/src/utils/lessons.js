export const daysMap = {
  1: 'понедельник',
  2: 'вторник',
  3: 'среда',
  4: 'четверг',
  5: 'пятница',
  6: 'суббота',
  7: 'воскресенье',
};

export const lessonsToArray = lessonsInDay => Array.from({ length: lessonsInDay }).map((_, i) => ({ lessonNumber: i + 1, text: '', style: 'vacant' }));

export const scheduleToGroups = (scheduleData) => {
  console.log('scheduleData', scheduleData);
  const { schedule, scheduleLessons, groups } = scheduleData;
  const newGroups = structuredClone(groups).map((group) => {
    const weekdays = schedule.weekdays.slice().map(day => ({ dayIndex: day, lessons: lessonsToArray(schedule.lessonsInDay) }));
    return { ...group, weekdays };
  });

  scheduleLessons.forEach((lesson) => {
    const currentGroup = newGroups.find(group => group.id === lesson.groupId);
    const currentWeekday = currentGroup.weekdays.find(weekday => weekday.dayIndex === lesson.weekday);
    const currentLesson = currentWeekday.lessons[lesson.lessonNumber - 1];
    currentLesson.text = lesson.groupAbbr;
    currentLesson.style = 'booked';
  });

  return newGroups;
};
