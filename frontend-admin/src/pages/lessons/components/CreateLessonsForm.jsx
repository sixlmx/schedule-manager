import styles from '../../pages.module.css'
import { render } from '../../../core/render'
import { ui } from '../../../utils/dom'
import LessonsPage from '../LessonsPage';
import { createLessons } from '../../../api/lessons';

export default function CreateLessonsForm({groups, teachers, subjects}) {
  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      groupId: parseInt(formData.get('groupId')),
      teacherId: parseInt(formData.get('teacherId')),
      subjectId: parseInt(formData.get('subjectId')),
      lessonsCount: parseInt(formData.get('lessonsCount')),
    }
    const result = await createLessons(data)
    ui.closeModal()
    ui.showFlashMessage(result)
    render('#main', <LessonsPage />)
  }

  return (
    <form class={styles.form} onSubmit={onSubmit}>
      <h3>Добавить нагрузку</h3>
      
<select name="groupId" required>
  <option disabled selected>Выберите группу</option>
  {groups.map(group => (
    <option value={group.id}>
      {group.name} ({group.abbreviation})
    </option>
  ))}
</select>

<select name="teacherId" required>
  <option disabled selected>Выберите преподавателя</option>
  {teachers.map(teacher => (
    <option value={teacher.id}>
      {teacher.fio} ({teacher.position})
    </option>
  ))}
</select>

<select name="subjectId" required>
  <option disabled selected>Выберите предмет</option>
  {subjects.map(subject => (
    <option value={subject.id}>
      {subject.name} ({subject.abbreviation})
    </option>
  ))}
</select>

      <input 
        type="number" 
        name="lessonsCount" 
        placeholder="Количество уроков" 
        required 
        min="1"
      />

      <button type="submit">Добавить нагрузку</button>
    </form>
  )
}