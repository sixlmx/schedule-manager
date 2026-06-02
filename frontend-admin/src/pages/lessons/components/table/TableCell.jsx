import { setLesson } from '../../../../api/lessons.js';
import { decrementWorkload } from '../../../../api/workloads.js';
import { render } from '../../../../core/render.js';
import { refreshPage } from '../../../../core/router.js';
import store from '../../../../state/store.js';
import { ui } from '../../../../utils/dom.js';
import { lessonsToArray } from '../../../../utils/lessons.js';
import InfoSection from '../InfoSection';
import styles from './LessonsTable.module.css'

export default function TableCell({ lessons, weekday, group }) {
  const handleClick = async (lesson) => {
    if (!store.ui.selectedWorkload) return;
    if (store.ui.selectedGroup !== group.id) return;
    const { lessonNumber } = lesson
    const result = await setLesson({ ...store.ui.selectedWorkload, lessonNumber, scheduleId: store.currentScheduleId, weekday })
    decrementWorkload(store.ui.selectedWorkload.workloadId)
    ui.showFlashMessage(result)
    refreshPage()
  }

  const showLessonInfo = (lesson) => {
    if (lesson.style !== 'booked') return;
    render("#infoSection", <InfoSection scheduleItem={lesson} />)
  }

  const clearLessonInfo = (lesson) => {
    if (lesson.style !== 'booked') return;
    render("#infoSection", <InfoSection />)
  }

  return (
    <td>
      <div class={styles.pairsContainer}>
        {lessons.map((lesson, index) => (
          <div class={`${styles.pairSlot} ${lesson.style}`} onMouseEnter={() => showLessonInfo(lesson)} onMouseLeave={() => clearLessonInfo(lesson)} onClick={(e) => handleClick(lesson)}>
            <span class={styles.pairText} title={lesson.text}>{lesson.text}</span>
          </div>
        ))}
      </div>
    </td>
  )
}
