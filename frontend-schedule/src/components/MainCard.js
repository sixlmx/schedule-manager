import styles from './MainCard.module.css'

export default function MainCard({ name, description, href }) {
  return `
    <a class="${styles.card}" href=${href}
      <h1 class="${styles.header}">${name}</h1>
      <h2 class="${styles.description}">${description}</h2>  
    </a>
  `
}
