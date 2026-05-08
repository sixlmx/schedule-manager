import { fetchTeachers } from '../../api/teachers'
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

    return teachers.filter((teacher) => {
      const name = String(teacher.name ?? '').toLowerCase()
      const fio = String(teacher.fio ?? '').toLowerCase()
      const position = String(teacher.position ?? '').toLowerCase()
      const color = String(teacher.color ?? '').toLowerCase()

      return name.includes(normalizedQuery)
        || fio.includes(normalizedQuery)
        || position.includes(normalizedQuery)
        || color.includes(normalizedQuery)
    })
  }
  const handleSearch = (query) => {
    const filteredTeachers = query ? filterTeachers(query) : teachers
    render('#teachers-table', <TeachersTable teachers={filteredTeachers} />)
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
