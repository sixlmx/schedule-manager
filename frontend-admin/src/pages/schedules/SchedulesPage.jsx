import { fetchSchedules } from '../../api/schedules'
import { cleanDeadHandlers } from '../../core/handlers'
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

    return schedules.filter((schedule) => [
      schedule.name,
      getCreatedDate(schedule.created),
      schedule.lessonsInDay,
      getWeekdaysText(schedule.weekdays),
    ]
      .map((value) => String(value ?? '').toLowerCase())
      .some((value) => value.includes(normalizedQuery)))
  }
  const handleSearch = async (query) => {
    const filteredSchedules = query ? filterSchedules(query) : schedules
    await render('#schedules-table', <SchedulesTable schedules={filteredSchedules} />)
    cleanDeadHandlers()
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
