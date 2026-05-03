import { fetchGroups } from '../../api/groups'
import CreateGroupForm from './components/CreateGroupForm'
import { handlers, registerClick } from '../../core/handlers'
import Modal from '../../shared/Modal'
import PageTitle from '../../shared/PageTitle'
import GroupsTable from './components/GroupTable'
import Sidebar from '../../shared/Sidebar'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function GroupsPage() {
  const groups = await fetchGroups()
  const showModalCreateGroup = () => ui.openModal('createGroup')

  return (
    <>
      <div class="content">

        <PageTitle title="Группы" />
        <GroupsTable groups={groups} />
        <button class={styles.addButton} onClick={showModalCreateGroup}>Добавить группу</button>
        <Modal modalId="createGroup">
          <CreateGroupForm closeId="createGroup" />
        </Modal>
      </div>
    </>
  )
}
