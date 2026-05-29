import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import Title from '../../components/Title.jsx'
import { fetchGroups } from '../../lib/api.js'
import Group from './components/Group.js'

export default async function Groups() {
  const groups = await fetchGroups()

  return (
    <div>
      <BreadCrumbs crumbs={[{ type: 'ref', href: '/public/groups', text: 'Группы' }]} />
      <Title text="Группы" />
      {groups.map(group => <Group {...group} />)}
    </div>
  )
}