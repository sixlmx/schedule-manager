import { fetchGroups } from '../../api/groups'
import CreateGroupForm from './components/CreateGroupForm'
import { render } from '../../core/render'
import Modal from '../../shared/Modal'
import PageHeader from '../shared/PageHeader'
import GroupsTable from './components/GroupTable'
import Sidebar from '../../shared/Sidebar'
import styles from '../pages.module.css'
import { ui } from '../../utils/dom'
import { filterByQuery } from '../../utils/search';

export default async function GroupsPage() {
  const groups = await fetchGroups()
  const showModalCreateGroup = () => ui.openModal('createGroup')
  const handleSearch = (query) => {
    const filteredGroups = query ? filterByQuery(groups, query) : groups
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
