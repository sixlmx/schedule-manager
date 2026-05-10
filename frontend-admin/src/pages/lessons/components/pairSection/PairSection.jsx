import { render } from '../../../../core/render';
import { ui } from '../../../../utils/dom';
import styles from '../../LessonsPage.module.css'
import InfoSection from '../InfoSection';
import Pair from './Pair';

export default function PairSection({ lessons }) {
  const showModalCreateLesson = () => ui.openModal('createLesson')
  return (
    <div class={styles.rightPanel}>
      <button
        class={styles.addButton}
        onClick={showModalCreateLesson}
      >
        Добавить нагрузку
      </button>
      {lessons.map((lesson) => <Pair lesson={lesson}/>)}
    </div>
  )
}
