import { fetchTeachers } from '../../api/teachers'
import CreateTeacherForm from './components/CreateTeacherForm'
import { handlers } from '../../core/handlers'
import Modal from '../../components/shared/Modal'
import PageTitle from '../../components/shared/PageTitle'
import TeachersTable from './components/TeachersTable'
import Sidebar from '../../components/shared/Sidebar'
import styles from './TeachersPage.module.css'

export default async function TeachersPage() {
  const teachers = await fetchTeachers()
  const showModalCreateTeacher = () => handlers.openModal('createTeacher')

  return (
    <>
      <div class='content'>
        <PageTitle title="Преподаватели" />
        <TeachersTable teachers={teachers} />
        <button
          class={styles.addButton}
          onClick={showModalCreateTeacher}
        >
          + Добавить преподавателя
        </button>
      </div>
      <Modal modalId="createTeacher">
        <CreateTeacherForm closeId="createTeacher" />
      </Modal>
    </>
  )
}