import {
  clearPublishedLessons,
  fetchPublishedSchedules,
  publishPeriodLessons,
} from '../../api/publication'
import { render } from '../../core/render'
import PageTitle from '../../shared/PageTitle'
import { ui } from '../../utils/dom'
import pages from '../pages.module.css'
import styles from './PublicationPage.module.css'

const formatDate = (dateValue) => {
  if (!dateValue) {
    return '-'
  }

  const [date] = String(dateValue).split('T')
  const [year, month, day] = date.split('-')

  if (!year || !month || !day) {
    return String(dateValue)
  }

  return `${day}.${month}.${year}`
}

const formatDateTime = (dateValue) => {
  if (!dateValue) {
    return '-'
  }

  return new Date(dateValue).toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

const addDaysToDateOnly = (dateValue, days) => {
  const [year, month, day] = String(dateValue).split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

const formatPeriod = (weekStartDate) => {
  if (!weekStartDate) {
    return '-'
  }

  return `${formatDate(weekStartDate)} - ${formatDate(addDaysToDateOnly(weekStartDate, 6))}`
}

const reloadPublicationPage = () => render('#main', <PublicationPage />)

export default async function PublicationPage() {
  const publicationState = await fetchPublishedSchedules()
  const hasLoadError = publicationState.type === 'error'
  const publishedSchedules = hasLoadError ? [] : publicationState.publishedSchedules
  const lastPublishedAt = hasLoadError ? null : publicationState.lastPublishedAt
  const hasPublishedSchedules = publishedSchedules.length > 0

  const handleAction = async (e, action) => {
    const button = e.target.closest('button')
    button.disabled = true

    const result = await action()
    ui.showFlashMessage(result)

    if (result.type !== 'error') {
      reloadPublicationPage()
      return
    }

    button.disabled = false
  }

  const handlePublish = e => handleAction(e, publishPeriodLessons)
  const handleClear = e => handleAction(e, clearPublishedLessons)

  return (
    <div class={`content ${pages.crudPage}`}>
      <div class={pages.crudHeader}>
        <PageTitle title="Публикация расписания" />
        <div class={styles.actions}>
          {hasPublishedSchedules
            ? <button class={`${pages.addButton} ${styles.deleteButton}`} onClick={handleClear}>УДАЛИТЬ ПУБЛИКАЦИИ</button>
            : null}
          <button class={pages.addButton} onClick={handlePublish}>
            {hasPublishedSchedules ? 'ОБНОВИТЬ ПУБЛИКАЦИЮ' : 'ОПУБЛИКОВАТЬ'}
          </button>
        </div>
      </div>

      <div class={styles.publicationContent}>
        {hasLoadError ? (
          <p class={styles.errorMessage}>Не удалось загрузить опубликованные расписания: {publicationState.message}</p>
        ) : null}

        <table class={`${pages.table} ${styles.infoTable}`}>
          <tbody>
            <tr>
              <td>Дата последней публикации</td>
              <td>{formatDateTime(lastPublishedAt)}</td>
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
                <th>Дата публикации</th>
                <th>Уроков</th>
              </tr>
            </thead>
            <tbody>
              {publishedSchedules.length > 0
                ? publishedSchedules.map(schedule => (
                  <tr>
                    <td>{schedule.name}</td>
                    <td>{formatPeriod(schedule.weekStartDate)}</td>
                    <td>{formatDateTime(schedule.publishedAt)}</td>
                    <td>{schedule.lessonsCount}</td>
                  </tr>
                ))
                : (
                  <tr>
                    <td class={styles.emptyRow} colspan="4">Опубликованных расписаний нет</td>
                  </tr>
                )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}