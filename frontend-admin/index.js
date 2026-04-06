import App from './src/App.jsx'
import { initHandlers } from './src/core/init.js'
import render from './src/core/render.js'

render('#app', App())
initHandlers()
