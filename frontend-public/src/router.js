import Teachers from './pages/teachers/Page.js'
import Schedule from './pages/lessons/Page.js'
import App from './App.js'
import ErrorPage from './pages/Error.js'
import Groups from './pages/groups/Page.js'

console.log('load')

const routes = [
  { path: '/public', component: App },
  { path: '/public/teachers', component: Teachers },
  { path: '/public/groups', component: Groups },
  { path: '/public/teachers/:id/lessons', component: Schedule },
]

const navigate = (pathname) => {
  for (const route of routes) {
    // Преобразуем динамический путь в регулярное выражение
    const pattern = route.path.replace(/:[^/]+/g, '([^/]+)') + '/?$'
    const regex = new RegExp('^' + pattern)

    if (regex.test(pathname)) {
      return route.component
    }
  }
  return ErrorPage
}

export const mountRoute = async () => {
  const href = (window.location.href).replace(/\/+$/, '')
  if (window.location.href.at(-1) === '/') history.replaceState({}, '', href)
  const { pathname } = new URL(href)

  const element = navigate(pathname)
  const app = document.querySelector('#app')
  app.innerHTML = await element()
}

document.addEventListener('click', async (event) => {
  const link = event.target.closest('a')
  if (link) {
    const href = link.getAttribute('href')
    event.preventDefault()
    if (href === 'back') {
      history.back()
      return
    }
    history.pushState({}, '', `${href}`)
    mountRoute()
  }
})

window.addEventListener('popstate', () => mountRoute())
