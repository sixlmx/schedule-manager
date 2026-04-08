import { registerClick, registerSubmit } from '../../core/handlers'
import styles from './ConfirmForm.module.css'

export default function ConfirmForm({ message, onConfirm, onCancel }) {
  const submitId = registerSubmit(onConfirm)
  const cancelId = registerClick(onCancel)
  
  return (
    <form class={styles.confirmForm} data-id={submitId} id="confirmForm">
      <p class={styles.message}>{message}</p>
      <div class={styles.actions}>
        <button type="submit" class={styles.submitBtn}>ОК</button>
        <button data-id={cancelId} type="button" class={styles.cancelBtn}>Отмена</button>
      </div>
    </form>
  )
}