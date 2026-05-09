import { pairsToArray } from '../../../../utils/lessons.js';
import styles from './LessonsTable.module.css'

export default function TableCell({ lessonsInDay }) {
  const pairsInDay = pairsToArray(lessonsInDay)
  return (
    <td>
      <div class={styles.pairsContainer}>
        {pairsInDay.map(() => (
          <div class={styles.pairSlot}></div>
        ))}
      </div>
    </td>
  )
}