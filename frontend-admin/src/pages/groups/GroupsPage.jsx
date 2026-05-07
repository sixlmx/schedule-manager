import { fetchGroups } from '../../api/groups'
import CreateGroupForm from './components/CreateGroupForm'
import { cleanDeadHandlers } from '../../core/handlers'
import { render } from '../../core/render'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import GroupsTable from './components/GroupTable'
import Sidebar from '../../shared/Sidebar'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'

export default async function GroupsPage() {
  const groups = await fetchGroups()
  const showModalCreateGroup = () => ui.openModal('createGroup')
  const filterGroups = (query) => {
    const normalizedQuery = query.toLowerCase()

    return groups.filter((group) => [
      group.name,
      group.abbreviation,
      group.year_of_admission,
    ]
      .map((value) => String(value ?? '').toLowerCase())
      .some((value) => value.includes(normalizedQuery)))
  }
  const handleSearch = async (query) => {
    const filteredGroups = query ? filterGroups(query) : groups
    await render('#groups-table', <GroupsTable groups={filteredGroups} />)
    cleanDeadHandlers()
  }

  return (
    <>
      <div class={`content ${styles.crudPage}`}>
        <PageHeader
          title="Группы"
          buttonText="Добавить группу"
          onAdd={showModalCreateGroup}
          searchPlaceholder="Поиск по группам"
          onSearch={handleSearch}
        />
        <div id="groups-table">
          <GroupsTable groups={groups} />
        </div>
        <Modal modalId="createGroup">
          <CreateGroupForm closeId="createGroup" />
        </Modal>
      </div>
    </>
  )
}
