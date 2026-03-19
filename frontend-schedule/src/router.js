import Teachers from './pages/teachers/Page.js'
import Schedule from './pages/schedule/Page.js'
import App from './App.js'
import ErrorComponent from './components/ErrorComponent.js'

console.log('load')

const routes = [
  { path: '/publications', component: App },
  { path: '/publications/teachers', component: Teachers },
  { path: '/publications/teachers/:id/lessons', component: Schedule },
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
  return ErrorComponent
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
  const baseUrl = window.location.href
  const link = event.target.closest('a')
  if (link) {
    const href = link.getAttribute('href')
    event.preventDefault()
    history.pushState({}, '', `${baseUrl}/${href}`)
    mountRoute()
  }
})

window.addEventListener('popstate', () => mountRoute())
