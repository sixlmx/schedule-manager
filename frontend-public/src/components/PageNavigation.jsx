import styles from './PageNavigation.module.css'

const formatDate = (dateValue) => {
  const [year, month, day] = String(dateValue).split('-')
  return `${day}.${month}.${year}`
}

export default function PageNavigation({ startDate, endDate }) {
  return (
    <div class={styles.navigation}>
      <a class={styles.button}>Предыдущая неделя</a>
      <div class={styles.date}>{formatDate(startDate)} - {formatDate(endDate)}</div>
      <a class={styles.button}>Следующая неделя</a>
    </div>
  )
}