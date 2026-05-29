import DayTable from './components/DayTable.jsx'
import { addWindows, sortLessonsByDays } from '../../lib/helpers/sortHelpers.js'
import styles from './Page.module.css'
import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import { fetchLessons } from '../../lib/api.js'
import PageNavigation from '../../components/PageNavigation.jsx'
import { parseUrl } from '../../lib/helpers/urlHelpers.js'

export default async function Page() {
  const { category } = parseUrl(window.location.href)
  const { startDate, lessons, group } = await fetchLessons(category)
  const sortedLessons = sortLessonsByDays(lessons)
  const days = Object.keys(sortedLessons)
  const breadcrumbs = [
    {
      type: 'ref', href: `/public/${category}`,
      text: category === 'teachers' ? 'Преподаватели' : 'Группы',
    },
    { text: category === 'teachers' ? lessons[0].teachers[0].fio : group.name },
  ]

  return (
    <div>
      <BreadCrumbs crumbs={breadcrumbs} />
      <PageNavigation />
      <div class={styles.scheduleDashboard}>
        <div class={styles.scheduleGrid}>
          {days.map(day => <DayTable lessons={addWindows(sortedLessons[day])} startDate={startDate} />)}
        </div>
      </div>
    </div>
  )
}