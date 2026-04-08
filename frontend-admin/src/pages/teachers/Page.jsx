import styles from './Page.module.css'
import { fetchTeachers } from '../../lib/data'
import CreateTeacherForm from './components/CreateTeacherForm'
import { handlers, registerClick } from '../../core/handlers'
import { deleteTeacher } from '../../lib/actions'
import render from '../../core/render'
import Modal from '../../components/shared/Modal'
import ConfirmForm from '../../components/shared/ConfirmForm'
import UpdateTeacherForm from './components/UpdateTeacherForm'

export default async function Page() {
  const teachers = await fetchTeachers()
  let teacher = {}
  const showModalCreateTeacher = () => {
    handlers.openModal('createTeacher')
  }
  const showModalUpdateTeacher = (e) => {
    const updateTeacherForm = document.querySelector('#updateTeacherForm')
    const teacherid = e.target.attributes.getNamedItem('teacherid').value
    teacher = teachers.find((teacher) => teacher.id === +teacherid)
    updateTeacherForm.dataset.teacherid = teacherid
    render('#updateTeacher-content', <UpdateTeacherForm closeId="updateTeacher" teacher={teacher}/>)
    handlers.openModal('updateTeacher')
  }
  const showModalDeleteTeacher = (e) => {
    const confirmForm = document.querySelector('#confirmForm')
    const teacherid = e.target.attributes.getNamedItem('teacherid').value
    confirmForm.dataset.teacherid = teacherid
    handlers.openModal('deleteTeacher')
  }
  const idCreate = registerClick(showModalCreateTeacher)
  const idUpdate = registerClick(showModalUpdateTeacher)
  const idDelete = registerClick(showModalDeleteTeacher)

  const onConfirm = async () => {
    const confirmForm = document.querySelector('#confirmForm')
    const teacherId = confirmForm.dataset.teacherid
    const result = await deleteTeacher(teacherId)
    handlers.closeModal('deleteTeacher')
    handlers.showFlashMessage(result)
    render('#main', <Page />)
  }

  const onCancel = () => handlers.closeModal('deleteTeacher')

  return (
    <div>
      <h1 class={styles.title}>Преподаватели</h1>
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
              <td><button teacherId={teacher.id} data-id={idUpdate}>Редактировать</button></td>
              <td><button teacherId={teacher.id} data-id={idDelete}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button data-id={idCreate}>Добавить преподавателя</button>
      <Modal modalId="createTeacher">
        <CreateTeacherForm closeId="createTeacher" />
      </Modal>
      <Modal modalId="updateTeacher">
        <UpdateTeacherForm closeId="updateTeacher" teacher={teacher} />
      </Modal>
      <Modal modalId="deleteTeacher">
        <ConfirmForm message="Подтвердите удаление преподавателя" onConfirm={onConfirm} onCancel={onCancel} />
      </Modal>
    </div>
  )
}