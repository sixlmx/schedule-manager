import { initListeners } from './handlers.js';
import { render } from './render.js';
import { mountRoute, setErrorComponent, setRoutes } from './router.js';

export async function initWood(App, routes, errorComponent) {
  if (errorComponent) {
    setErrorComponent(errorComponent);
  }

  if (routes) {
    setRoutes(routes);
  }

  await render('#app', App());

  if (routes) {
    mountRoute();
  }

  initListeners();
}
