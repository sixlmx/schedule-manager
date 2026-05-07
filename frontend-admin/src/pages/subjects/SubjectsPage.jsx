import { fetchSubjects } from '../../api/subjects.js'
import { cleanDeadHandlers } from '../../core/handlers'
import { render } from '../../core/render'
import CreateSubjectForm from './components/CreateSubjectForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import SubjectsTable from './components/SubjectsTable'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function SubjectsPage() {
  const subjects = await fetchSubjects()
  const showModalCreateSubject = () => ui.openModal('createSubject')
  const filterSubjects = (query) => {
    const normalizedQuery = query.toLowerCase()

    return subjects.filter((subject) => [
      subject.name,
      subject.abbreviation,
      subject.abbr,
    ]
      .map((value) => String(value ?? '').toLowerCase())
      .some((value) => value.includes(normalizedQuery)))
  }
  const handleSearch = async (query) => {
    const filteredSubjects = query ? filterSubjects(query) : subjects
    await render('#subjects-table', <SubjectsTable subjects={filteredSubjects} />)
    cleanDeadHandlers()
  }

  return (
    <>
      <div class={`content ${styles.crudPage}`}>
        <PageHeader
          title="Предметы"
          buttonText="Добавить предмет"
          onAdd={showModalCreateSubject}
          searchPlaceholder="Поиск по предметам"
          onSearch={handleSearch}
        />
        <div id="subjects-table">
          <SubjectsTable subjects={subjects} />
        </div>
      </div>
      <Modal modalId="createSubject">
        <CreateSubjectForm closeId="createSubject" />
      </Modal>
    </>
  )
}
