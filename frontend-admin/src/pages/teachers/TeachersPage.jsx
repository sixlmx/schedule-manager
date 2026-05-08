import { fetchTeachers } from '../../api/teachers'
import { render } from '../../core/render'
import CreateTeacherForm from './components/CreateTeacherForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import TeachersTable from './components/TeachersTable'
import Sidebar from '../../shared/Sidebar'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'
import { filterByQuery } from '../../utils/search';

export default async function TeachersPage() {
  const teachers = await fetchTeachers()
  const showModalCreateTeacher = () => ui.openModal('createTeacher')
  const handleSearch = (query) => {
    const filteredTeachers = query ? filterByQuery(teachers, query) : teachers
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
