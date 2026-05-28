import DayTable from './components/DayTable.jsx'
import { addWindows, sortLessonsByDays } from '../../lib/helpers/sortHelpers.js'
import styles from './Page.module.css'
import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import { fetchLessons } from '../../lib/api.js'
import PageNavigation from '../../components/PageNavigation.jsx'
import { parseUrl } from '../../lib/helpers/urlHelpers.js'

export default async function Page() {
  const { category } = parseUrl(window.location.href)
  const { startDate, endDate, lessons, teacher, group } = await fetchLessons(category)
  const sortedLessons = sortLessonsByDays(lessons)
  const days = Object.keys(sortedLessons)
  const title = category === 'teachers' ? teacher?.fio : group?.name
  const breadcrumbs = [
    {
      type: 'ref', href: `/public/${category}`,
      text: category === 'teachers' ? 'Преподаватели' : 'Группы',
    },
    { text: title ?? '-' },
  ]

  return (
    <div>
      <BreadCrumbs crumbs={breadcrumbs} />
      <PageNavigation startDate={startDate} endDate={endDate} />
      <div class={styles.scheduleDashboard}>
        <div class={styles.scheduleGrid}>
          {days.length > 0
            ? days.map(day => <DayTable lessons={addWindows(sortedLessons[day])} startDate={startDate} />)
            : <p>Опубликованных занятий нет</p>}
        </div>
      </div>
    </div>
  )
}