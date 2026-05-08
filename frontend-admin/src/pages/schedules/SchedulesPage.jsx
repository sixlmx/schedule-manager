import { fetchSchedules } from '../../api/schedules'
import { render } from '../../core/render'
import CreateScheduleForm from './components/CreateScheduleForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import pages from '../pages.module.css'
import SchedulesTable from './components/SchedulesTable'
import { ui } from '../../utils/dom'
import { filterByQuery } from '../../utils/search';

export default async function SchedulesPage() {
  const schedules = await fetchSchedules()
  const showModalCreateSchedule = () => ui.openModal('createSchedule')
  const handleSearch = (query) => {
    const filteredSchedules = query ? filterByQuery(schedules, query) : schedules
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
