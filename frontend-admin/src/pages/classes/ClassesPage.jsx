import { fetchClasses } from '../../api/classes'
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

    return classes.filter((classItem) => {
      const name = String(classItem.name ?? '').toLowerCase()
      const abbreviation = String(classItem.abbreviation ?? '').toLowerCase()
      const capacity = String(classItem.capacity ?? '').toLowerCase()
      const building = String(classItem.building ?? '').toLowerCase()

      return name.includes(normalizedQuery)
        || abbreviation.includes(normalizedQuery)
        || capacity.includes(normalizedQuery)
        || building.includes(normalizedQuery)
    })
  }
  const handleSearch = (query) => {
    const filteredClasses = query ? filterClasses(query) : classes
    render('#classes-table', <ClassesTable classes={filteredClasses} />)
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
