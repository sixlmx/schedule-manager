import { deleteSchedule } from "../../../api/schedules";
import ConfirmForm from "../../../shared/ConfirmForm";
import Modal from "../../../shared/Modal";
import { render } from "../../../core/render";
import SchedulesPage from "../SchedulesPage";
import pages from "../../pages.module.css"
import UpdateScheduleForm from "./UpdateScheduleForm";
import { ui } from "../../../utils/dom";
import { redirect } from "../../../core/router";
import state from "../../../state";
import Sidebar from "../../../shared/Sidebar";

export default function SchedulesTable({ schedules }) {
  let scheduleToDelete;
  let scheduleToUpdate = {};

  const redirectToLessons = (scheduleId) => {
    state.currentScheduleIndex = scheduleId
    redirect(`/admin/lessons/${scheduleId}`)
    render('#sidebarContainer', <Sidebar />)
  }

  const onConfirm = async () => {
    const result = await deleteSchedule(scheduleToDelete)
    ui.closeModal()
    ui.showFlashMessage(result)
    scheduleToDelete = null
    render('#main', <SchedulesPage />)
  }

  const showModalUpdateSchedule = (scheduleId) => {
    scheduleToUpdate = schedules.find((schedule) => schedule.id === scheduleId)
    render('#updateSchedule-content', <UpdateScheduleForm closeId="updateSchedule" schedule={scheduleToUpdate} />)
    ui.openModal('updateSchedule')
  }

  const showModalDeleteSchedule = (scheduleId) => {
    scheduleToDelete = scheduleId
    ui.openModal('deleteSchedule')
  }

  return (
    <>
      <table class={pages.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата создания</th>
            <th>Пар в день</th>
            <th>Дни недели</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id} onClick={() => redirectToLessons(schedule.id)}>
              <td>{schedule.name}</td>
              <td>{new Date(schedule.created).toLocaleDateString()}</td>
              <td>{schedule.lessonsInDay}</td>
              <td>{schedule.weekdays?.join(', ')}</td>
              <td>
                <button
                  class={`${pages.tableActionButton} ${pages.tableEditButton}`}
                  onClick={() => showModalUpdateSchedule(schedule.id)}
                >
                  Редактировать
                </button>
              </td>
              <td>
                <button
                  class={`${pages.tableActionButton} ${pages.tableDeleteButton}`}
                  onClick={() => showModalDeleteSchedule(schedule.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal modalId="updateSchedule">
        <UpdateScheduleForm closeId="updateSchedule" schedule={scheduleToUpdate} />
      </Modal>
      <Modal modalId="deleteSchedule">
        <ConfirmForm message="Подтвердите удаление расписания" onConfirm={onConfirm} />
      </Modal>
    </>
  )
}
