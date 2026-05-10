import styles from '../pages.module.css'

export default function SearchForm({ searchPlaceholder, onSearch }) {
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const query = String(formData.get('query') ?? '').trim()

    onSearch(query)
    e.target.querySelector('input').focus();
  }

  return (
    <form class={styles.searchForm} onSubmit={handleSearchSubmit}>
      <input class={styles.searchInput} name="query" type="search" placeholder={searchPlaceholder} />
      <button class={styles.searchButton} type="submit">
        Найти
      </button>
    </form>
  )
}
