import { render } from '../../../../core/render';
import { redirect, refreshPage } from '../../../../core/router';
import state from '../../../../state';
import InfoSection from '../InfoSection';
import styles from './Pair.module.css'

export default function Pair({ lesson }) {
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
      onMouseLeave={onMouseLeave} onClick={selectGroup} onContextMenu={(e)=>console.log(12)}>
      <div class={styles.subjectName}>{lesson.subjectAbbr}</div>
      <div class={styles.divider}></div>
      <div class={styles.lessonsCount}>{lesson.lessonsCount}</div>
    </div>
  )
}
