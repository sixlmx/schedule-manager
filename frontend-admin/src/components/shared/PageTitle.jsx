import styles from './PageTitle.module.css'

export default function PageTitle({ title }) {
  return (
    <h1 class={styles.title}>{title}</h1>
  )
}
