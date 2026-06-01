import PageTitle from '../../shared/PageTitle'
import pages from '../pages.module.css'
import styles from './PublicationPage.module.css'
import { fetchPublications } from '../../api/publications.js'

export default async function PublicationPage() {
  const publications = await fetchPublications()

  return (
    <div class={`content ${pages.crudPage}`}>
      <div class={pages.crudHeader}>
        <PageTitle title="Публикация расписания" />
        <button class={pages.addButton} onClick={() => { }}>ОПУБЛИКОВАТЬ</button>
      </div>

      <div class={styles.publicationContent}>
        <table class={`${pages.table} ${styles.infoTable}`}>
          <tbody>
            <tr>
              <td>Ссылка на опубликованное расписание</td>
            </tr>
            <tr>
              <td>Дата последней публикации</td>
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
              {publications.map(schedule => (
                <tr>
                  <td>{schedule.name}</td>
                  <td>{schedule.period}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
