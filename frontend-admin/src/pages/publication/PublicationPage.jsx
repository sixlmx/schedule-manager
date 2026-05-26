import PageTitle from '../../shared/PageTitle'
import pages from '../pages.module.css'
import styles from './PublicationPage.module.css'

const publicationInfo = {
  url: '',
  lastPublishedAt: '-',
}

const publishedSchedules = []

export default function PublicationPage() {
  return (
    <div class={`content ${pages.crudPage}`}>
      <div class={pages.crudHeader}>
        <PageTitle title="Публикация расписания" />
        <button class={pages.addButton} type="button">ОПУБЛИКОВАТЬ</button>
      </div>

      <div class={styles.publicationContent}>
        <table class={`${pages.table} ${styles.infoTable}`}>
          <tbody>
            <tr>
              <td>Ссылка на опубликованное расписание</td>
              <td>
                {publicationInfo.url
                  ? <a href={publicationInfo.url}>{publicationInfo.url}</a>
                  : <span class={styles.emptyValue}>-</span>}
              </td>
            </tr>
            <tr>
              <td>Дата последней публикации</td>
              <td>{publicationInfo.lastPublishedAt}</td>
            </tr>
          </tbody>
        </table>

        <section class={styles.publishedSection}>
          <h2 class={styles.sectionTitle}>Опубликованные расписания</h2>
          <table class={pages.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Период</th>
              </tr>
            </thead>
            <tbody>
              {publishedSchedules.length
                ? publishedSchedules.map(schedule => (
                  <tr>
                    <td>{schedule.name}</td>
                    <td>{schedule.period}</td>
                  </tr>
                ))
                : (
                  <tr>
                    <td class={styles.emptyRow} colspan="2">Опубликованных расписаний пока нет</td>
                  </tr>
                )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
