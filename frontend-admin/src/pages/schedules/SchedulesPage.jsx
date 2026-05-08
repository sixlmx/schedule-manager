import { fetchSchedules } from '../../api/schedules'
import { render } from '../../core/render'
import CreateScheduleForm from './components/CreateScheduleForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import pages from '../pages.module.css'
import SchedulesTable from './components/SchedulesTable'
import { ui } from '../../utils/dom'

export default async function SchedulesPage() {
  const schedules = await fetchSchedules()
  const showModalCreateSchedule = () => ui.openModal('createSchedule')
  const getCreatedDate = (created) => new Date(created).toLocaleDateString()
  const getWeekdaysText = (weekdays) => Array.isArray(weekdays) ? weekdays.join(', ') : weekdays
  const filterSchedules = (query) => {
    const normalizedQuery = query.toLowerCase()

    return schedules.filter((schedule) => {
      const name = String(schedule.name ?? '').toLowerCase()
      const created = String(getCreatedDate(schedule.created) ?? '').toLowerCase()
      const lessonsInDay = String(schedule.lessonsInDay ?? '').toLowerCase()
      const weekdays = String(getWeekdaysText(schedule.weekdays) ?? '').toLowerCase()

      return name.includes(normalizedQuery)
        || created.includes(normalizedQuery)
        || lessonsInDay.includes(normalizedQuery)
        || weekdays.includes(normalizedQuery)
    })
  }
  const handleSearch = (query) => {
    const filteredSchedules = query ? filterSchedules(query) : schedules
    render('#schedules-table', <SchedulesTable schedules={filteredSchedules} />)
  }

  return (
    <>
      <div class={`${pages.crudPage} content`}>
        <PageHeader
          title="Расписания"
          buttonText="Добавить расписание"
          onAdd={showModalCreateSchedule}
          searchPlaceholder="Поиск по расписаниям"
          onSearch={handleSearch}
        />
        <div id="schedules-table">
          <SchedulesTable schedules={schedules} />
        </div>
        <Modal modalId="createSchedule">
          <CreateScheduleForm closeId="createSchedule" />
        </Modal>
      </div>
    </>
  )
}
