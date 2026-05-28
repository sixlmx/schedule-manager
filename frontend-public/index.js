import App from './src/App.jsx';
import ErrorPage from './src/pages/Error.jsx';
import Groups from './src/pages/groups/Page.jsx';
import Schedule from './src/pages/lessons/Page.jsx';
import Teachers from './src/pages/teachers/Page.jsx';
import { initWood } from './src/core/initWood.js';

const routes = [
  { path: '/public', component: App, parentSelector: '#app' },
  { path: '/public/publications/:id', component: App, parentSelector: '#app' },
  { path: '/public/teachers', component: Teachers, parentSelector: '#app' },
  { path: '/public/groups', component: Groups, parentSelector: '#app' },
  { path: '/public/teachers/:id/lessons', component: Schedule, parentSelector: '#app' },
  { path: '/public/groups/:id/lessons', component: Schedule, parentSelector: '#app' },
  { path: '/public/publications/:publicationId/teachers', component: Teachers, parentSelector: '#app' },
  { path: '/public/publications/:publicationId/groups', component: Groups, parentSelector: '#app' },
  { path: '/public/publications/:publicationId/teachers/:id/lessons', component: Schedule, parentSelector: '#app' },
  { path: '/public/publications/:publicationId/groups/:id/lessons', component: Schedule, parentSelector: '#app' },
];

const errorComponent = { component: ErrorPage, parentSelector: '#app' };

initWood(App, routes, errorComponent);
