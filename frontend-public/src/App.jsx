import MainCard from './components/MainCard.jsx'
import { parseUrl } from './lib/helpers/urlHelpers.js'
import styles from './App.module.css'

export default function App() {
  const { publicBase } = parseUrl(window.location.href)

  return (
    <div class={styles.main}>
      <h1 class={styles.header}>Расписание занятий</h1>
      <h2 class={styles.subheader}>Выберите категорию для просмотра</h2>
      <div class={styles.cardsContainer}>
        <MainCard name="Преподаватели" description="Расписание по преподавателям" href={`${publicBase}/teachers`} />
        <MainCard name="Группы" description="Расписание по группам" href={`${publicBase}/groups`} />
      </div>
    </div>
  )
}