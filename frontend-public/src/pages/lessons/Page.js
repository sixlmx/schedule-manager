import DayTable from './components/DayTable'
import { getMondayDate } from '../../lib/helpers/dateHelpers'
import { addWindows, sortLessonsByDays } from '../../lib/helpers/sortHelpers'
import styles from './Page.module.css'

export default async function Page() {
  const teacherId = new URL(window.location.href).pathname.split('/')[3]
  const date = getMondayDate()

  async function fetchLessons() {
    try {
      const response = await fetch(`/apiv1/teachers/lessons?teacher=${teacherId}&date=${date}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    }
    catch (error) {
      console.error('Fetch error:', error)
    }
  }
  const { startDate, lessons } = await fetchLessons()
  const sortedLessons = sortLessonsByDays(lessons)
  const days = Object.keys(sortedLessons)

  return `
    <div class=${styles.scheduleDashboard}>
      <h1 class=${styles.scheduleHeader}>${'Страница с расписанием'}</h1>
      <div class=${styles.scheduleGrid}>
        ${days.map(day => DayTable({ lessons: addWindows(sortedLessons[day]), startDate })).join('\n')}
      </div>
    </div>
  `
}
