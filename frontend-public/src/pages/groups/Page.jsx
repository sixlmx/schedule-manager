import BreadCrumbs from '../../components/BreadCrumbs.jsx'
import Title from '../../components/Title.jsx'
import { fetchGroups } from '../../lib/api.js'
import { parseUrl } from '../../lib/helpers/urlHelpers.js'
import Group from './components/Group.js'

export default async function Groups() {
  const groups = await fetchGroups()
  const { publicBase } = parseUrl(window.location.href)

  return (
    <div>
      <BreadCrumbs rootHref={publicBase} crumbs={[{ type: 'ref', href: `${publicBase}/groups`, text: 'Группы' }]} />
      <Title text="Группы" />
      {groups.map(group => <Group {...group} publicBase={publicBase} />)}
    </div>
  )
}