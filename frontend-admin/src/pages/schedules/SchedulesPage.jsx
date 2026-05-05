import { fetchSchedules } from '../../api/schedules'
import CreateScheduleForm from './components/CreateScheduleForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import pages from '../pages.module.css'
import SchedulesTable from './components/SchedulesTable'
import { ui } from '../../utils/dom'

export default async function SchedulesPage() {
  const schedules = await fetchSchedules()
  const showModalCreateSchedule = () => ui.openModal('createSchedule')

  return (
    <>
      <div class={`${pages.crudPage} content`}>
        <PageHeader title="Расписания" addButtonText="Добавить расписание" onAdd={showModalCreateSchedule} />
        <SchedulesTable schedules={schedules} />
        <Modal modalId="createSchedule">
          <CreateScheduleForm closeId="createSchedule" />
        </Modal>
      </div>
    </>
  )
}
