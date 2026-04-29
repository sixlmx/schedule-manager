import styles from './Sidebar.module.css'

export default function SidebarCategory({ text, handler, isActive }) {
  return <li>
    <button class={isActive ? 'activeNavBtn sidebarBtn' : 'sidebarBtn'} onClick={handler}>{text}</button>
  </li>
}