import Teachers from './pages/teachers/Page.js'
import Schedule from './pages/schedule/Page.js'
import App from './App.js'
import ErrorComponent from './components/ErrorComponent.js'

console.log('load')

const router = {
  publications: {
    component: App,
    teachers: {
      component: Teachers,
      dynamicRoute: {
        lessons: {
          component: Schedule,
        },
      },
    },
  },
  error: ErrorComponent,
}

const navigate = (pathname) => {
  const routes = pathname.slice(1).split('/')
  let current = router

  for (const segment of routes) {
    if (current[segment]) {
      current = current[segment]
    }
    else if (current['dynamicRoute']) {
      current = current['dynamicRoute']
    }
    else return router.error
  }
  return current.component || router.error
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
