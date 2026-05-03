import styles from '../../pages.module.css'
import { updateTeacher } from '../../../api/teachers'
import { render } from '../../../core/render'
import TeachersPage from '../TeachersPage'
import { ui } from '../../../utils/dom'

export default function UpdateTeacherForm({ closeId, teacher }) {
  const onSubmit = async (e) => {
    const formData = new FormData(e.target)
    const data = {
      fio: formData.get('fio'),
      abbr: formData.get('abbr'),
      position: formData.get('position'),
      id: teacher.id,
    }
    const result = await updateTeacher(data)
    ui.closeModal()
    ui.showFlashMessage(result)
    render('#main', <TeachersPage />)
  }

  return (
    <form class={styles.form} onSubmit={onSubmit} id="updateTeacherForm">
      <h3>Редактировать преподавателя</h3>
      <input type="text" name="fio" placeholder="ФИО" required value={teacher.name} />
      <input type="text" name="abbr" placeholder="Сокращение" required value={teacher.fio} />
      <input type="text" name="position" placeholder="Должность" value={teacher.position} />
      <button type="submit">Редактировать</button>
    </form>
  )
}
