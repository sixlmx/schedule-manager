import { fetchLessonsByScheduleId } from '../../api/lessons';
import Modal from '../../shared/Modal';
import CreateLessonsForm from './components/CreateLessonsForm';
import LessonsTable from './components/table/LessonsTable';
import PairSection from './components/pairSection/PairSection';
import styles from './LessonsPage.module.css'
import InfoSection from './components/InfoSection';

export default async function LessonsPage() {
  const { pathname } = new URL(window.location.href)
  const [, , , scheduleId] = pathname.split('/')
  const test = await fetchLessonsByScheduleId(scheduleId);
  const { schedule, lessons, groups, subjects, teachers } = test;
  
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
        <div id="infoSection" class={styles.leftPanel}>

        <InfoSection />
        </div>
        <PairSection lessons={lessons}/>
      </div>
      <Modal modalId="createLesson">
        <CreateLessonsForm teachers={teachers} groups={groups} subjects={subjects} scheduleId={scheduleId} />
      </Modal>
    </div>
  );
}