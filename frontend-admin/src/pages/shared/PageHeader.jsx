import PageTitle from '../../shared/PageTitle'
import SearchForm from './SearchForm'
import styles from '../pages.module.css'

export default function PageHeader({ title, buttonText, onAdd, searchPlaceholder, onSearch }) {
  return (
    <div class={styles.crudHeader}>
      <PageTitle title={title} />
      <SearchForm searchPlaceholder={searchPlaceholder} onSearch={onSearch} />
      <button class={styles.addButton} onClick={onAdd}>
        {buttonText}
      </button>
    </div>
  )
}
