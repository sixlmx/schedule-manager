import Main from './components/Main.js'
import Sidebar from './components/Sidebar.js'
import styles from './App.module.css'

export default function App() {
  return `<div class="${styles.container}">
      ${Sidebar()}
      ${Main()}
      <div class="flash-message"></div>    
  </div>`
}
