import { render } from '../../../../core/render';
import { refreshPage } from '../../../../core/router';
import state from '../../../../state';
import { deleteLesson } from '../../../../api/lessons';
import { ui } from '../../../../utils/dom';
import InfoSection from '../InfoSection';
import styles from './Pair.module.css'

export default function Pair({ lesson }) {

  const handleDeleteLesson = async () => {
    const result = await deleteLesson(lesson.id)
    ui.hideCustomMenu()
    ui.showFlashMessage(result)
    refreshPage()
  }

  const handleContextMenu = (e) => {
    ui.showCustomMenu(e.clientX, e.clientY, handleDeleteLesson)
  }
  const selectGroup = () => {
    state.ui.selectedGroup = lesson.groupId
    refreshPage()
  }
  console.log(state.ui.selectedGroup);
  const onMouseEnter = () => {
    render("#infoSection", <InfoSection lesson={lesson} />)
  }
  const onMouseLeave = () => {
    render("#infoSection", <InfoSection />)
  }
  return (
    <div class={styles.pair} onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} onClick={selectGroup} onContextMenu={handleContextMenu}>
      <div class={styles.subjectName}>{lesson.subjectAbbr}</div>
      <div class={styles.divider}></div>
      <div class={styles.lessonsCount}>{lesson.lessonsCount}</div>
    </div>
  )
}
