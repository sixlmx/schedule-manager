import { fetchTeachers } from '../../api/teachers'
import { cleanDeadHandlers } from '../../core/handlers'
import { render } from '../../core/render'
import CreateTeacherForm from './components/CreateTeacherForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import TeachersTable from './components/TeachersTable'
import Sidebar from '../../shared/Sidebar'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function TeachersPage() {
  const teachers = await fetchTeachers()
  const showModalCreateTeacher = () => ui.openModal('createTeacher')
  const filterTeachers = (query) => {
    const normalizedQuery = query.toLowerCase()

    return teachers.filter((teacher) => [
      teacher.name,
      teacher.fio,
      teacher.position,
      teacher.color,
    ]
      .map((value) => String(value ?? '').toLowerCase())
      .some((value) => value.includes(normalizedQuery)))
  }
  const handleSearch = async (query) => {
    const filteredTeachers = query ? filterTeachers(query) : teachers
    await render('#teachers-table', <TeachersTable teachers={filteredTeachers} />)
    cleanDeadHandlers()
  }

  return (
    <>
      <div class={`content ${styles.crudPage}`}>
        <PageHeader
          title="Преподаватели"
          buttonText="Добавить преподавателя"
          onAdd={showModalCreateTeacher}
          searchPlaceholder="Поиск по преподавателям"
          onSearch={handleSearch}
        />
        <div id="teachers-table">
          <TeachersTable teachers={teachers} />
        </div>
      </div>
      <Modal modalId="createTeacher">
        <CreateTeacherForm closeId="createTeacher" />
      </Modal>
    </>
  )
}
