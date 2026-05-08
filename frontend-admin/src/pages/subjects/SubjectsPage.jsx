import { fetchSubjects } from '../../api/subjects.js'
import { render } from '../../core/render'
import CreateSubjectForm from './components/CreateSubjectForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import SubjectsTable from './components/SubjectsTable'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'
import { filterByQuery } from '../../utils/search.js';

export default async function SubjectsPage() {
  const subjects = await fetchSubjects()
  const showModalCreateSubject = () => ui.openModal('createSubject')
  const handleSearch = (query) => {
    const filteredSubjects = query ? filterByQuery(subjects, query) : subjects
    render('#subjects-table', <SubjectsTable subjects={filteredSubjects} />)
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
