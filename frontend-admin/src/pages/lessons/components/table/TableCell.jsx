import { setLesson } from '../../../../api/lessons.js';
import { refreshPage } from '../../../../core/router.js';
import state from '../../../../state/state.js';
import { ui } from '../../../../utils/dom.js';
import { lessonsToArray } from '../../../../utils/lessons.js';
import styles from './LessonsTable.module.css'

export default function TableCell({ lessons, weekday, group }) {
  const handleClick = async (lesson) => {
    if (!state.ui.selectedWorkload) return;
    if (state.ui.selectedGroup !== group.id) return;
    console.log('click');
    const {lessonNumber} = lesson
    console.log(2, state.ui.selectedWorkload);
    console.log(1, {...state.ui.selectedWorkload, lessonNumber, scheduleId: state.currentScheduleId, weekday});
    const result = await setLesson({...state.ui.selectedWorkload, lessonNumber, scheduleId: state.currentScheduleId, weekday})
    ui.showFlashMessage(result)
    refreshPage()
  }

  // const pairsInDay = lessonsToArray(lessonsInDay)
  return (
    <td>
      <div class={styles.pairsContainer}>
        {lessons.map((lesson, index) => (
          <div class={`${styles.pairSlot} ${lesson.style}`} onClick={(e) => handleClick(lesson)}>{lesson.text}</div>
        ))}
      </div>
    </td>
  )
}
