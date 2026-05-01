import ConfirmForm from "../../../shared/ConfirmForm";
import Modal from "../../../shared/Modal";
import { handlers } from "../../../core/handlers"
import { render } from "../../../core/render";
import GroupsPage from "../GroupsPage";
import styles from "./GroupsTable.module.css"
import UpdateGroupForm from "./UpdateGroupForm";
import { deleteGroup } from "../../../api/groups";

export default function GroupsTable({ groups }) {
  let groupToDelete;
  let groupToUpdate = {};

  const onConfirm = async () => {
    const result = await deleteGroup(groupToDelete)
    handlers.closeModal()
    handlers.showFlashMessage(result)
    groupToDelete = null
    render('#main', <GroupsPage />)
  }
  const showModalUpdateGroup = (groupId) => {
    groupToUpdate = groups.find(group => group.id === groupId)
    render('#updateGroup-content', <UpdateGroupForm closeId="updateGroup" group={groupToUpdate} />)
    handlers.openModal('updateGroup')
  }
  const showModalDeleteGroup = (groupId) => {
    groupToDelete = groupId
    handlers.openModal('deleteGroup')
  }

  return (
    <div>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Группа</th>
            <th>Год поступления</th>
            <th>Сокращение</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr>
              <td>{group.name}</td>
              <td>{group.year_of_admission}</td>
              <td>{group.abbreviation}</td>
              <td><button groupId={group.id} onClick={()=> showModalUpdateGroup(group.id)}>Редактировать</button></td>
              <td><button groupId={group.id} onClick={() => showModalDeleteGroup(group.id)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal modalId="updateGroup">
        <UpdateGroupForm group={groupToUpdate} />
      </Modal>
      <Modal modalId="deleteGroup">
        <ConfirmForm message="Подтвердите удаление группы" onConfirm={onConfirm} />
      </Modal>
    </div>
  )
}
