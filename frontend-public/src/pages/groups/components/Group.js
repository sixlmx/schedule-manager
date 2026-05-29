import { h } from '../../../core/h.js';
import { redirect } from '../../../core/router.js';
import styles from './Group.module.css';

export default function Group(group) {
  return h(
    'h5',
    null,
    h('button', { class: styles.groupButton, onClick: () => redirect(`/public/groups/${group.id}/lessons`) }, group.name),
  );
}
