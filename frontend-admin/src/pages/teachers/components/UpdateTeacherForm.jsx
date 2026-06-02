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
      color: formData.get('color'),
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
      <div>
        <label><input type="radio" name="color" value="red" checked={teacher.color === 'red'} /><span style="background:red; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="orange" checked={teacher.color === 'orange'} /><span style="background:orange; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="yellow" checked={teacher.color === 'yellow'} /><span style="background:yellow; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="green" checked={teacher.color === 'green'} /><span style="background:green; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="blue" checked={teacher.color === 'blue'} /><span style="background:blue; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="cyan" checked={teacher.color === 'cyan'} /><span style="background:cyan; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="violet" checked={teacher.color === 'violet'} /><span style="background:violet; width:20px; height:20px; display:inline-block;"></span></label>
      </div>

      <button type="submit">Редактировать</button>
    </form>
  )
}
