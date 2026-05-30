import styles from './Error.module.css'
import { navigateBack } from '../core/router.js'

export default function Error() {
  return (
    <div class={styles.errorPage}>
      <div class={styles.errorContent}>
        <h1 class={styles.errorCode}>404</h1>
        <h2 class={styles.errorTitle}>Страница не найдена</h2>
        <p class={styles.errorMessage}>Указанный путь ошибочен или страница была удалена</p>
        <button class={styles.errorBackBtn} onClick={() => navigateBack()}>← Вернуться назад</button>
      </div>
    </div>
  )
}