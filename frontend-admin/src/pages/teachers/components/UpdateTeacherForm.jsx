import styles from './TeacherForm.module.css'
import { handlers, registerSubmit } from '../../../core/handlers'
import { updateTeacher } from '../../../api/teachers'
import render from '../../../core/render'
import Page from '../Page'

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
    handlers.closeModal(closeId)
    handlers.showFlashMessage(result)
    render('#main', <Page />)
  }

  const formId = registerSubmit(onSubmit)

  return (
    <form class={styles.modal} data-id={formId} id="updateTeacherForm">
      <h3>Редактировать преподавателя</h3>
      <input type="text" name="fio" placeholder="ФИО" required value={teacher.name}/>
      <input type="text" name="abbr" placeholder="Сокращение" required value={teacher.fio}/>
      <input type="text" name="position" placeholder="Должность" value={teacher.position}/>
      <button type="submit">Редактировать</button>
    </form>
  )
}