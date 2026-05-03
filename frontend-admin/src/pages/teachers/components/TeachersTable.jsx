import { deleteTeacher } from "../../../api/teachers";
import ConfirmForm from "../../../shared/ConfirmForm";
import Modal from "../../../shared/Modal";
import { render } from "../../../core/render";
import TeachersPage from "../TeachersPage";
import styles from "../../pages.module.css"
import UpdateTeacherForm from "./UpdateTeacherForm";
import { ui } from "../../../utils/dom";

export default function TeachersTable({ teachers }) {
  let teacherToDelete;
  let teacherToUpdate = {};
  const onConfirm = async () => {
    const result = await deleteTeacher(teacherToDelete)
    ui.closeModal()
    ui.showFlashMessage(result)
    teacherToDelete = null
    render('#main', <TeachersPage />)
  }

  const showModalUpdateTeacher = (teacherId) => {
    teacherToUpdate = teachers.find((teacher) => teacher.id === teacherId)
    render('#updateTeacher-content', <UpdateTeacherForm closeId="updateTeacher" teacher={teacherToUpdate} />)
    ui.openModal('updateTeacher')
  }
  
  const showModalDeleteTeacher = (teacherId) => {
    teacherToDelete = teacherId
    ui.openModal('deleteTeacher')
  }

  return (
    <>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Преподаватель</th>
            <th>Сокращение</th>
            <th>Должность</th>
            <th>Цвет</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr>
              <td>{teacher.name}</td>
              <td>{teacher.fio}</td>
              <td>{teacher.position}</td>
              <td>{teacher.color}</td>
              <td><button class={`${styles.tableActionButton} ${styles.tableEditButton}`} teacherId={teacher.id} onClick={() => showModalUpdateTeacher(teacher.id)}>Редактировать</button></td>
              <td><button class={`${styles.tableActionButton} ${styles.tableDeleteButton}`} teacherId={teacher.id} onClick={() => showModalDeleteTeacher(teacher.id)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal modalId="updateTeacher">
        <UpdateTeacherForm closeId="updateTeacher" teacher={teacherToUpdate} />
      </Modal>
      <Modal modalId="deleteTeacher">
        <ConfirmForm message="Подтвердите удаление преподавателя" onConfirm={onConfirm} />
      </Modal>
    </>
  )
}
