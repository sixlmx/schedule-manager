import { fetchClasses } from '../../api/classes'
import { cleanDeadHandlers } from '../../core/handlers'
import { render } from '../../core/render'
import CreateClassForm from './components/CreateClassForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import ClassesTable from './components/ClassesTable'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function ClassesPage() {
  const classes = await fetchClasses()
  const showModalCreateClass = () => ui.openModal('createClass')
  const filterClasses = (query) => {
    const normalizedQuery = query.toLowerCase()

    return classes.filter((classItem) => [
      classItem.name,
      classItem.abbreviation,
      classItem.capacity,
      classItem.building,
    ]
      .map((value) => String(value ?? '').toLowerCase())
      .some((value) => value.includes(normalizedQuery)))
  }
  const handleSearch = async (query) => {
    const filteredClasses = query ? filterClasses(query) : classes
    await render('#classes-table', <ClassesTable classes={filteredClasses} />)
    cleanDeadHandlers()
  }

  return (
    <>
      <div class={`content ${styles.crudPage}`}>
        <PageHeader
          title="Аудитории"
          buttonText="Добавить аудиторию"
          onAdd={showModalCreateClass}
          searchPlaceholder="Поиск по аудиториям"
          onSearch={handleSearch}
        />
        <div id="classes-table">
          <ClassesTable classes={classes} />
        </div>
        <Modal modalId="createClass">
          <CreateClassForm closeId="createClass" />
        </Modal>
      </div>
    </>
  )
}
