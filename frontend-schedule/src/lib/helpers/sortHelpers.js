import { calcWindow } from "./dateHelpers"

export const addWindows = (dayLessons) => {
  const result = [dayLessons[0]]
  for (let i = 0; i < dayLessons.length - 1; i += 1) {
    const thisLesson = dayLessons[i]
    const nextLesson = dayLessons[i + 1]
    const gap = nextLesson.lesson - thisLesson.lesson
    result.push(dayLessons[i])
    if (gap > 1) {
      result.push({ type: 'window', totalTime: calcWindow(thisLesson.endTime, nextLesson.startTime) })
    }
  }
  return result
}

export const sortLessonsByDays = (lessons) => {
  console.log('lessons: ', lessons)
  const weekdays = Array.from(new Set(lessons.map(lesson => lesson.weekday))).sort()
  return weekdays.reduce((acc, day) => {
    const lessonsByDay = lessons.filter(lesson => lesson.weekday === day).sort((a, b) =>
      a['lesson'] > b['lesson'] ? 1 : -1,
    )
    return { ...acc, [day]: lessonsByDay }
  }, {})
}


