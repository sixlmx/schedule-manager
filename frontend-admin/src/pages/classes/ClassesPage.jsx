import { fetchClasses } from '../../api/classes'
import CreateClassForm from './components/CreateClassForm'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import ClassesTable from './components/ClassesTable'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function ClassesPage() {
  const classes = await fetchClasses()
  const showModalCreateClass = () => ui.openModal('createClass')

  return (
    <>
      <div class={`content ${styles.crudPage}`}>
        <PageHeader title="Аудитории" addButtonText="Добавить аудиторию" onAdd={showModalCreateClass} />
        <ClassesTable classes={classes} />
        <Modal modalId="createClass">
          <CreateClassForm closeId="createClass" />
        </Modal>
      </div>
    </>
  )
}
