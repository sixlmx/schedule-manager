import styles from "../../pages.module.css"

export default function ClassesTable({ classes, onEdit, onDelete }) {
  return (
    <>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Сокращение</th>
            <th>Количество мест</th>
            <th>Корпус</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {classes.map(classItem => (
            <tr>
              <td>{classItem.name}</td>
              <td>{classItem.abbreviation}</td>
              <td>{classItem.capacity}</td>
              <td>{classItem.building}</td>
              <td><button class={`${styles.tableActionButton} ${styles.tableEditButton}`} onClick={() => onEdit(classItem)}>Редактировать</button></td>
              <td><button class={`${styles.tableActionButton} ${styles.tableDeleteButton}`} onClick={() => onDelete(classItem)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
