import { fetchSchedules } from '../../api/schedules'
import CreateScheduleForm from './components/CreateScheduleForm'
import Modal from '../../shared/Modal'
import PageTitle from '../../shared/PageTitle'
import pages from '../pages.module.css'
import SchedulesTable from './components/SchedulesTable'
import { ui } from '../../utils/dom'

export default async function SchedulesPage() {
  const schedules = await fetchSchedules()
  const showModalCreateSchedule = () => ui.openModal('createSchedule')

  return (
    <>
      <div class={pages.crudPage}>
        <div class={pages.crudHeader}>
          <PageTitle title="Расписания" />
          <button class={pages.addButton} onClick={showModalCreateSchedule}>Добавить расписание</button>
        </div>
        <SchedulesTable schedules={schedules} />
        <Modal modalId="createSchedule">
          <CreateScheduleForm closeId="createSchedule" />
        </Modal>
      </div>
    </>
  )
}
