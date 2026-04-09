import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import Title from '../../components/Title.jsx'
import { fetchTeachers } from '../../lib/api.js'
import TeacherName from './components/Teacher.jsx'

export default async function Teachers() {
  const teachers = await fetchTeachers()

  return (
    <div>
      <BreadCrumbs crumbs={[{ type: 'ref', href: '/public/teachers', text: 'Преподаватели' }]} />
      <Title text="Преподаватели" />
      <div>
        {teachers.map(teacher => <TeacherName {...teacher} />)}
      </div>
    </div>
  )
}