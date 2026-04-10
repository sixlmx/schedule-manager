import CallsPage from '../pages/calls/CallsPage'
import styles from './Main.module.css'

export default function Main() {
  return (
    <div class={styles.main} id="main">
      <CallsPage />
    </div>
  )
}