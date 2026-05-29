import styles from './BreadCrumbs.module.css'
import { redirect } from '../core/router.js'

export default function BreadCrumbs({ crumbs }) {
  return (
    <div class={styles.breadcrumbs}>
      <button class={styles.breadcrumbButton} onClick={() => redirect('/public')}>Расписание занятий</button>
      {crumbs.map((crumb) => (
        <div>
          <span class={styles.slash}>/</span>
          {crumb.type === 'ref'
            ? <button class={styles.breadcrumbButton} onClick={() => redirect(crumb.href)}>{crumb.text}</button>
            : <span>{crumb.text}</span>
          }
        </div>
      ))}
    </div>
  )
}