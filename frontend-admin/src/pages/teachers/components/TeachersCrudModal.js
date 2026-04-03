import Modal from '../../../components/ui/Modal'
import styles from './TeachersCrudModal.module.css'
import { handlers, registerHandler } from '../../../core/init'
import { createTeacher } from '../../../lib/actions'

export default function TeachersCrudModal() {
  const onSubmit = async (e) => {
    const formData = new FormData(e.target)
    const data = {
      fio: formData.get('fio'),
      abbr: formData.get('abbr'),
      position: formData.get('position'),
    }
    const result = await createTeacher(data)
    if (result) {
      handlers.closeModal()
      handlers.showFlashMessage({ type: 'success', message: 'Пользователь успешно создан!' })
    }
  }

  const id = registerHandler(onSubmit)

  const form = `
  <form class="${styles.modal}" data-id="${id}">
    <h3>Добавить преподавателя</h3>
    <input type="text" name="fio" id="fio" placeholder="ФИО" />
    <input type="text" name="abbr" id="abbr" placeholder="Сокращение" />
    <input type="text" name="position" id="position" placeholder="Должность" />
    <button type="submit">Добавить</button>
  </form>
  `

  return `${Modal(form)}`
}
