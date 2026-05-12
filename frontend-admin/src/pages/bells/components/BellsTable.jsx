import styles from '../../pages.module.css'
import { formatDuration, formatTime } from '../helpers'

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
