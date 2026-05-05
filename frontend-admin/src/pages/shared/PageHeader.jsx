import PageTitle from '../../shared/PageTitle'
import styles from '../pages.module.css'

export default function PageHeader({ title, addButtonText, onAdd }) {
  return (
    <div class={styles.crudHeader}>
      <PageTitle title={title} />
      {addButtonText && onAdd && (
        <button class={styles.addButton} onClick={onAdd}>
          {addButtonText}
        </button>
      )}
    </div>
  )
}
