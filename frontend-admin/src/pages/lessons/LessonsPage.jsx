import { fetchLessonsByScheduleId } from '../../api/lessons';
import Modal from '../../shared/Modal';
import PageTitle from '../../shared/PageTitle';
import { ui } from '../../utils/dom';
import CreateLessonsForm from './components/CreateLessonsForm';
import LessonsTable from './components/LessonsTable';
import styles from './LessonsPage.module.css'

export default async function LessonsPage() {
  const { pathname } = new URL(window.location.href)
  const [root, adminRoute, lessonsRoute, scheduleId] = pathname.split('/')
  const { schedule, lessons, groups, subjects, teachers } = await fetchLessonsByScheduleId(scheduleId);
  
  const showModalCreateLesson = () => ui.openModal('createLesson')
  
  if (!schedule) {
    return <div>Расписание не найдено</div>;
  }

  return (
    <div class={styles.crudPage}>
      <div class={styles.crudHeader}>
        <h1>Уроки: {schedule.name}</h1>
      </div>

      <div class={styles.tableWrapper}>
        <LessonsTable
          lessons={lessons}
          groups={groups}
          schedule={schedule}
        />
      </div>

      <div class={styles.bottomContainer}>
        <div class={styles.leftPanel}>
          <h1>info</h1>
        </div>
        <div class={styles.rightPanel}>
          <h1>lessons</h1>
          <button
            class={styles.addButton}
            onClick={showModalCreateLesson}
          >
            Добавить нагрузку
          </button>
        </div>
      </div>
      <Modal modalId="createLesson">
        <CreateLessonsForm teachers={teachers} groups={groups} subjects={subjects} scheduleId={scheduleId}/>
      </Modal>
    </div>
  );
}