import styles from './MainCard.module.css'
import { redirect } from '../core/router.js'

export default function MainCard({ name, description, path }) {
  return (
    <button class={styles.card} onClick={() => redirect(path)}>
      <h1 class={styles.header}>{name}</h1>
      <h2 class={styles.description}>{description}</h2>
    </button>
  )
}