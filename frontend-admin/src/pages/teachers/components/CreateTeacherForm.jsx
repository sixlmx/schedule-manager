import styles from '../../pages.module.css'
import { createTeacher } from '../../../api/teachers'
import { render } from '../../../core/render'
import TeachersPage from '../TeachersPage'
import { ui } from '../../../utils/dom'

export default function CreateTeacherForm() {
  const onSubmit = async (e) => {
    const formData = new FormData(e.target)
    const data = {
      fio: formData.get('fio'),
      abbr: formData.get('abbr'),
      position: formData.get('position'),
      color: formData.get('color'),
    }
    const result = await createTeacher(data)
    ui.closeModal()
    ui.showFlashMessage(result)
    render('#main', <TeachersPage />)
  }

  return (
    <form class={styles.form} onSubmit={onSubmit}>
      <h3>Добавить преподавателя</h3>
      <input type="text" name="fio" placeholder="ФИО" required />
      <input type="text" name="abbr" placeholder="Сокращение" required />
      <input type="text" name="position" placeholder="Должность" />
      <div>
        <label><input type="radio" name="color" value="red" required /><span style="background:red; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="orange" /><span style="background:orange; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="yellow" /><span style="background:yellow; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="green" /><span style="background:green; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="blue" /><span style="background:blue; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="cyan" /><span style="background:cyan; width:20px; height:20px; display:inline-block;"></span></label>
        <label><input type="radio" name="color" value="violet" /><span style="background:violet; width:20px; height:20px; display:inline-block;"></span></label>
      </div>

      <button type="submit">Добавить</button>
    </form>
  )
}
