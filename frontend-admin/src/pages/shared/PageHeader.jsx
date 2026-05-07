import PageTitle from '../../shared/PageTitle'
import styles from '../pages.module.css'

export default function PageHeader({ title, buttonText, onAdd, searchPlaceholder, onSearch }) {
  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const query = String(formData.get('query') ?? '').trim()
    onSearch(query)
  }

  return (
    <div class={styles.crudHeader}>
      <PageTitle title={title} />
      <form class={styles.searchForm} onSubmit={handleSearch}>
        <input class={styles.searchInput} name="query" type="search" placeholder={searchPlaceholder} />
        <button class={styles.searchButton} type="submit">
          Найти
        </button>
      </form>
      <button class={styles.addButton} onClick={onAdd}>
        {buttonText}
      </button>
    </div>
  )
}
