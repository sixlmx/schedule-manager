import { fetchGroups } from '../../api/groups'
import CreateGroupForm from './components/CreateGroupForm'
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

    return groups.filter((group) => {
      const name = String(group.name ?? '').toLowerCase()
      const abbreviation = String(group.abbreviation ?? '').toLowerCase()
      const yearOfAdmission = String(group.year_of_admission ?? '').toLowerCase()

      return name.includes(normalizedQuery)
        || abbreviation.includes(normalizedQuery)
        || yearOfAdmission.includes(normalizedQuery)
    })
  }
  const handleSearch = (query) => {
    const filteredGroups = query ? filterGroups(query) : groups
    render('#groups-table', <GroupsTable groups={filteredGroups} />)
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
