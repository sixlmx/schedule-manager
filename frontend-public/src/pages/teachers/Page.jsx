import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import Title from '../../components/Title.jsx'
import { fetchTeachers } from '../../lib/api.js'
import { parseUrl } from '../../lib/helpers/urlHelpers.js'
import TeacherName from './components/Teacher.jsx'

export default async function Teachers() {
  const teachers = await fetchTeachers()
  const { publicBase } = parseUrl(window.location.href)

  return (
    <div>
      <BreadCrumbs rootHref={publicBase} crumbs={[{ type: 'ref', href: `${publicBase}/teachers`, text: 'Преподаватели' }]} />
      <Title text="Преподаватели" />
      <div>
        {teachers.map(teacher => <TeacherName {...teacher} publicBase={publicBase} />)}
      </div>
    </div>
  )
}