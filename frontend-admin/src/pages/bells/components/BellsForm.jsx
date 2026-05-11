import styles from '../../pages.module.css'

const formatTimeInput = (time) => {
  if (!time) return ''

  return String(time).slice(0, 5)
}

export default function BellsForm({ bells, onSave }) {
  const handleSubmit = (e) => {
    const formData = new FormData(e.target)
    const updatedBells = bells.map((bell) => ({
      lessonNumber: bell.lessonNumber,
      startTime: String(formData.get(`startTime_${bell.lessonNumber}`)),
      endTime: String(formData.get(`endTime_${bell.lessonNumber}`)),
    }))

    onSave(updatedBells)
  }

  return (
    <form class={styles.form} onSubmit={handleSubmit}>
      <h3>Редактировать звонки</h3>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Урок</th>
            <th>Начало урока</th>
            <th>Конец урока</th>
          </tr>
        </thead>
        <tbody>
          {bells.map((bell) => (
            <tr>
              <td>{bell.lessonNumber}</td>
              <td>
                <input
                  type="time"
                  required
                  name={`startTime_${bell.lessonNumber}`}
                  value={formatTimeInput(bell.startTime)}
                />
              </td>
              <td>
                <input
                  type="time"
                  required
                  name={`endTime_${bell.lessonNumber}`}
                  value={formatTimeInput(bell.endTime)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Сохранить</button>
    </form>
  )
}
