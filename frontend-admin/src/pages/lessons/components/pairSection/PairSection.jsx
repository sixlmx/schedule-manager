import { ui } from '../../../../utils/dom';
import styles from '../../LessonsPage.module.css'
import Pair from './Pair';

export default function PairSection({ lessons }) {
  const showModalCreateLesson = () => ui.openModal('createLesson')
  return (
    <div class={styles.rightPanel}>
      <h1>lessons</h1>
      {lessons.map((lesson) => <Pair lesson={lesson}/>)}
      <button
        class={styles.addButton}
        onClick={showModalCreateLesson}
      >
        Добавить нагрузку
      </button>
    </div>
  )
}
