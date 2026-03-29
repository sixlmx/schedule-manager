import Modal from '../../../components/ui/Modal'
import styles from './TeachersCrudModal.module.css'
import { registerHandler } from '../../../core/init'

export default function TeachersCrudModal() {
  const onSubmit = (e) => {
    console.log(1, e)
  }

  const id = registerHandler(onSubmit)

  const form = `
  <form class="${styles.modal}" data-id="${id}">
    <label for="fio">ФИО</label>
    <input type="text" id="fio" />
    <label for="abbr">Сокращение</label>
    <input type="text" id="abbr" />
    <label for="position">Должность</label>
    <input type="text" id="position" />
    <button type="submit">Отправить форму</button>
  </form>
  `

  return `${Modal('teachersCrudModal', form)}`
}
