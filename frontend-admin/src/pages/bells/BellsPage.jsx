import { fetchBellsByScheduleId, updateBellsByScheduleId } from '../../api/bells'
import { render } from '../../core/render'
import Modal from '../../shared/Modal'
import PageTitle from '../../shared/PageTitle'
import { ui } from '../../utils/dom'
import pages from '../pages.module.css'
import BellsForm from './components/BellsForm'
import BellsTable from './components/BellsTable'

const getScheduleId = () => {
  const { pathname } = new URL(window.location.href)
  const [, , , scheduleId] = pathname.split('/')

  return scheduleId
}

const buildBellRows = (bells, lessonsInDay) => {
  const rowsCount = Number(lessonsInDay)

  if (!Number.isInteger(rowsCount)) {
    throw new Error('Schedule lessonsInDay is required')
  }

  return Array.from({ length: rowsCount }, (_, index) => {
    const lessonNumber = index + 1
    const bell = bells.find((item) => item.lessonNumber === lessonNumber)

    return {
      lessonNumber,
      startTime: bell ? bell.startTime : '',
      endTime: bell ? bell.endTime : '',
    }
  })
}

export default async function BellsPage() {
  const scheduleId = getScheduleId()
  const { schedule, bells } = await fetchBellsByScheduleId(scheduleId)

  if (!schedule) {
    return <div>Расписание не найдено</div>
  }

  const bellRows = buildBellRows(bells, schedule.lessonsInDay)

  const handleSaveBells = async (updatedBells) => {
    const result = await updateBellsByScheduleId(scheduleId, updatedBells)
    ui.closeModal()
    ui.showFlashMessage(result)
    render('#main', <BellsPage />)
  }

  const openEditBellsModal = () => {
    render('#editBells-content', <BellsForm bells={bellRows} onSave={handleSaveBells} />)
    ui.openModal('editBells')
  }

  return (
    <>
      <div class={`content ${pages.crudPage}`}>
        <div class={pages.crudHeader}>
          <PageTitle title={`Звонки: ${schedule.name}`} />
          <button class={pages.addButton} onClick={openEditBellsModal}>Редактировать</button>
        </div>
        <BellsTable bells={bellRows} />
        <Modal modalId="editBells" />
      </div>
    </>
  )
}
