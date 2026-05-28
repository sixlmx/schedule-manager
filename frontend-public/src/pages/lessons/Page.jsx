import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import PageNavigation from '../../components/PageNavigation.jsx'
import { fetchLessons } from '../../lib/api.js'
import { addWindows, sortLessonsByDays } from '../../lib/helpers/sortHelpers.js'
import { parseUrl } from '../../lib/helpers/urlHelpers.js'
import DayTable from './components/DayTable.jsx'
import styles from './Page.module.css'

export default async function Schedule() {
  const { category, publicBase } = parseUrl(window.location.href)
  const { startDate, endDate, lessons, teacher, group } = await fetchLessons(category)
  const sortedLessons = sortLessonsByDays(lessons)
  const days = Object.keys(sortedLessons)
  const title = category === 'teachers' ? teacher?.fio : group?.name
  const crumbs = [
    {
      type: 'ref', href: `${publicBase}/${category}`,
      text: category === 'teachers' ? 'Преподаватели' : 'Группы',
    },
    { type: 'text', text: title ?? '' },
  ]

  return (
    <div>
      <BreadCrumbs rootHref={publicBase} crumbs={crumbs} />
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