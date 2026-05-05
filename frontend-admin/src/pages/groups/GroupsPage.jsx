import { fetchGroups } from '../../api/groups'
import CreateGroupForm from './components/CreateGroupForm'
import { handlers, registerClick } from '../../core/handlers'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import GroupsTable from './components/GroupTable'
import Sidebar from '../../shared/Sidebar'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function GroupsPage() {
  const groups = await fetchGroups()
  const showModalCreateGroup = () => ui.openModal('createGroup')

  return (
    <>
      <div class={`content ${styles.crudPage}`}>
        <PageHeader title="Группы" addButtonText="Добавить группу" onAdd={showModalCreateGroup} />
        <GroupsTable groups={groups} />
        <Modal modalId="createGroup">
          <CreateGroupForm closeId="createGroup" />
        </Modal>
      </div>
    </>
  )
}
