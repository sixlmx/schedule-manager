import styles from "../../pages.module.css"

export default function SubjectsTable({ subjects, onEdit, onDelete }) {
  return (
    <>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Сокращение</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>{subject.abbreviation || subject.abbr}</td>
              <td><button class={`${styles.tableActionButton} ${styles.tableEditButton}`} onClick={() => onEdit(subject)}>Редактировать</button></td>
              <td><button class={`${styles.tableActionButton} ${styles.tableDeleteButton}`} onClick={() => onDelete(subject)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
