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
          <PageTitle title="Р Р°СЃРїРёСЃР°РЅРёСЏ" />
          <button class={pages.addButton} onClick={showModalCreateSchedule}>Р”РѕР±Р°РІРёС‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ</button>
        </div>
        <SchedulesTable schedules={schedules} />
        <Modal modalId="createSchedule">
          <CreateScheduleForm closeId="createSchedule" />
        </Modal>
      </div>
    </>
  )
}
