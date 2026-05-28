import styles from './BreadCrumbs.module.css'

export default function BreadCrumbs({ crumbs, rootHref = '/public' }) {
  return (
    <div class={styles.breadcrumbs}>
      <a href={rootHref}>Расписание занятий</a>
      {crumbs.map((crumb) => (
        <div>
          <span class={styles.slash}>/</span>
          {crumb.type === 'ref'
            ? <a href={crumb.href}>{crumb.text}</a>
            : <span>{crumb.text}</span>
          }
        </div>
      ))}
    </div>
  )
}