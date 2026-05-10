import { render } from '../../../../core/render';
import InfoSection from '../InfoSection';
import styles from './Pair.module.css'

export default function Pair({ lesson }) {
  const onMouseEnter = () => {
    render("#infoSection", <InfoSection lesson={lesson}/>)
  }
  const onMouseLeave = () => {
    render("#infoSection", <InfoSection />)
  }
  return (
    <div class={styles.pair} onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div class={styles.subjectName}>{lesson.subjectAbbr}</div>
      <div class={styles.divider}></div>
      <div class={styles.lessonsCount}>{lesson.lessonsCount}</div>
    </div>
  )
}
