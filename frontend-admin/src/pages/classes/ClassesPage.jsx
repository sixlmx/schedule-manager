import { fetchClasses } from '../../api/classes'
import { render } from '../../core/render'
import CreateClassForm from './components/CreateClassForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import ClassesTable from './components/ClassesTable'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'
import { filterByQuery } from '../../utils/search';

export default async function ClassesPage() {
  const classes = await fetchClasses()
  const showModalCreateClass = () => ui.openModal('createClass')
  const handleSearch = (query) => {
    const filteredClasses = query ? filterByQuery(classes, query) : classes
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
