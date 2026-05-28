import {
  deletePublication,
  fetchPublicationState,
  publishPeriodLessons,
  updatePublicationSettings,
} from '../../api/publication'
import { render } from '../../core/render'
import PageTitle from '../../shared/PageTitle'
import { ui } from '../../utils/dom'
import pages from '../pages.module.css'
import styles from './PublicationPage.module.css'

const TEACHER_NAME_FORMAT_LABELS = {
  initials: 'Сокращение инициалов',
  full: 'Полное ФИО',
}

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
const getPublicHref = (publicPath) => {
  if (!publicPath) {
    return ''
  }

  const url = new URL(window.location.href)
  const isLocalAdmin = ['localhost', '127.0.0.1'].includes(url.hostname) && url.port === '5173'
  const origin = isLocalAdmin ? `${url.protocol}//${url.hostname}:5174` : url.origin

  return `${origin}${publicPath}`
}

const getSettingsEditMode = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('edit') === 'settings'
}

const closeSettingsEditMode = () => {
  history.replaceState({}, '', '/admin/publication')
}

const openSettingsEditMode = () => {
  history.replaceState({}, '', '/admin/publication?edit=settings')
  render('#main', <PublicationPage />)
}

const reloadPublicationPage = () => render('#main', <PublicationPage />)

export default async function PublicationPage() {
  const publicationState = await fetchPublicationState()
  const hasLoadError = publicationState.type === 'error'
  const publishedSchedules = hasLoadError ? [] : publicationState.publishedSchedules
  const isPublished = hasLoadError ? false : publicationState.isPublished
  const lastPublishedAt = hasLoadError ? null : publicationState.lastPublishedAt
  const publicPath = hasLoadError ? '' : publicationState.publicPath || publicationState.publicUrl
  const publicUrl = getPublicHref(publicPath)
  const settings = hasLoadError ? {} : publicationState.settings
  const isEditingSettings = getSettingsEditMode()

  const handleAction = async (e, action) => {
    const button = e.target.closest('button')
    button.disabled = true

    const result = await action()
    ui.showFlashMessage(result)

    if (result.type !== 'error') {
      closeSettingsEditMode()
      reloadPublicationPage()
      return
    }

    button.disabled = false
  }

  const handlePublish = e => handleAction(e, publishPeriodLessons)
  const handleDelete = e => handleAction(e, deletePublication)

  const handleSettingsSubmit = async (e) => {
    const submitButton = e.target.querySelector('button')
    submitButton.disabled = true

    const formData = new FormData(e.target)
    const result = await updatePublicationSettings({
      schoolName: formData.get('schoolName'),
      schoolWebsiteUrl: formData.get('schoolWebsiteUrl'),
      teacherNameFormat: formData.get('teacherNameFormat'),
    })

    ui.showFlashMessage(result)

    if (result.type !== 'error') {
      closeSettingsEditMode()
      reloadPublicationPage()
      return
    }

    submitButton.disabled = false
  }

  return (
    <div class={`content ${pages.crudPage}`}>
      <div class={pages.crudHeader}>
        <PageTitle title="Публикация расписания" />
        <div class={styles.actions}>
          {isPublished
            ? <button class={`${pages.addButton} ${styles.deleteButton}`} onClick={handleDelete}>УДАЛИТЬ ПУБЛИКАЦИЮ</button>
            : null}
          <button class={pages.addButton} onClick={handlePublish}>
            {isPublished ? 'ОБНОВИТЬ ПУБЛИКАЦИЮ' : 'ОПУБЛИКОВАТЬ'}
          </button>
        </div>
      </div>

      <div class={styles.publicationContent}>
        {hasLoadError ? (
          <p class={styles.errorMessage}>Не удалось загрузить публикацию: {publicationState.message}</p>
        ) : null}

        <table class={`${pages.table} ${styles.infoTable}`}>
          <tbody>
            <tr>
              <td>Ссылка на опубликованное расписание</td>
              <td>
                {publicUrl
                  ? <a href={publicUrl}>{publicUrl}</a>
                  : <span class={styles.emptyValue}>-</span>}
              </td>
            </tr>
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

        <section class={styles.settingsSection}>
          <div class={styles.settingsHeader}>
            <h2 class={styles.sectionTitle}>Настройки</h2>
            {!isEditingSettings
              ? <button class={pages.addButton} onClick={openSettingsEditMode}>РЕДАКТИРОВАТЬ</button>
              : null}
          </div>

          {isEditingSettings
            ? (
              <form class={styles.settingsForm} onSubmit={handleSettingsSubmit}>
                <table class={pages.table}>
                  <tbody>
                    <tr>
                      <td>Название учебного учреждения</td>
                      <td>
                        <input class={styles.settingsInput} name="schoolName" value={settings.schoolName} />
                      </td>
                    </tr>
                    <tr>
                      <td>Адрес сайта учебного учреждения</td>
                      <td>
                        <input class={styles.settingsInput} name="schoolWebsiteUrl" value={settings.schoolWebsiteUrl} />
                      </td>
                    </tr>
                    <tr>
                      <td>Формат отображения Ф.И.О преподавателей</td>
                      <td>
                        <select class={styles.settingsInput} name="teacherNameFormat">
                          <option value="initials" selected={settings.teacherNameFormat !== 'full'}>Сокращение инициалов</option>
                          <option value="full" selected={settings.teacherNameFormat === 'full'}>Полное ФИО</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class={styles.settingsActions}>
                  <button class={pages.addButton}>СОХРАНИТЬ</button>
                </div>
              </form>
            )
            : (
              <table class={pages.table}>
                <tbody>
                  <tr>
                    <td>Название учебного учреждения</td>
                    <td>{settings.schoolName || <span class={styles.emptyValue}>-</span>}</td>
                  </tr>
                  <tr>
                    <td>Адрес сайта учебного учреждения</td>
                    <td>{settings.schoolWebsiteUrl || <span class={styles.emptyValue}>-</span>}</td>
                  </tr>
                  <tr>
                    <td>Формат отображения Ф.И.О преподавателей</td>
                    <td>{TEACHER_NAME_FORMAT_LABELS[settings.teacherNameFormat] || TEACHER_NAME_FORMAT_LABELS.initials}</td>
                  </tr>
                </tbody>
              </table>
            )}
        </section>
      </div>
    </div>
  )
}