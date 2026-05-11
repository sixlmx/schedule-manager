import styles from '../../pages.module.css'

const timeToMinutes = (time) => {
  if (!time) return null

  const [hours, minutes] = String(time).split(':').map(Number)
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null

  return hours * 60 + minutes
}

const formatTime = (time) => {
  if (!time) return ''

  return String(time).slice(0, 5)
}

const formatDuration = (startTime, endTime) => {
  const start = timeToMinutes(startTime)
  const end = timeToMinutes(endTime)

  if (start === null || end === null) return ''

  return `${end - start} мин`
}

export default function BellsTable({ bells }) {
  return (
    <>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Урок</th>
            <th>Начало урока</th>
            <th>Конец урока</th>
            <th>Длина урока</th>
            <th>Длина перерыва</th>
          </tr>
        </thead>
        <tbody>
          {bells.map((bell, index) => {
            const nextBell = bells[index + 1]

            return (
              <tr>
                <td>{bell.lessonNumber}</td>
                <td>{formatTime(bell.startTime)}</td>
                <td>{formatTime(bell.endTime)}</td>
                <td>{formatDuration(bell.startTime, bell.endTime)}</td>
                <td>{nextBell ? formatDuration(bell.endTime, nextBell.startTime) : ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
