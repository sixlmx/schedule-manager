import { setLesson } from '../../../../api/lessons.js';
import { decrementWorkload } from '../../../../api/workloads.js';
import { render } from '../../../../core/render.js';
import { refreshPage } from '../../../../core/router.js';
import store from '../../../../state/store.js';
import { ui } from '../../../../utils/dom.js';
import InfoSection from '../InfoSection';
import styles from './LessonsTable.module.css'

export default function TableCell({ lessons, weekday, group }) {
  const selectLesson = (lesson) => {
    store.ui.selectedLessonId = lesson.id
    store.ui.selectedWorkload = null
    store.ui.selectedGroup = null
    store.ui.workloadId = null
    refreshPage()
  }

  const handleClick = async (lesson) => {
    if (lesson.style === 'booked') {
      selectLesson(lesson)
      return
    }

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

  const getLessonClass = (lesson) => {
    const baseClass = `${styles.pairSlot} ${lesson.style}`

    if (lesson.style === 'booked' && lesson.id === store.ui.selectedLessonId) {
      return `${baseClass} ${styles.selected}`
    }

    return baseClass
  }

  return (
    <td>
      <div class={styles.pairsContainer}>
        {lessons.map((lesson) => (
          <div class={getLessonClass(lesson)} onMouseEnter={() => showLessonInfo(lesson)} onMouseLeave={() => clearLessonInfo(lesson)} onClick={() => handleClick(lesson)}>
            <span class={styles.pairText} title={lesson.text}>{lesson.text}</span>
          </div>
        ))}
      </div>
    </td>
  )
}
