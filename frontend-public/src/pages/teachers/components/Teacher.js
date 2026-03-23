import styles from './Teacher.module.css'

export default function TeacherName(teacher) {
  return `
  <a href="/public/teachers/${teacher.id}/lessons"><h5 class=${styles.teacherName}>${teacher.name}</h5></a>`
}
