import { initListeners } from "./handlers.js"
import { render } from "./render.js"
import { mountRoute, setErrorComponent, setRoutes } from "./router.js"

export function initWood(App, routes, errorComponent) {
  render('#app', App())

  if (routes) {
    setRoutes(routes)
    mountRoute()
  }

  if (errorComponent) {
    setErrorComponent(errorComponent)
  }

  initListeners()
}