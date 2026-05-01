import Sidebar from "./shared/Sidebar";

export default function App() {
  return (
    <>
      <aside id="sidebarContainer">
        <Sidebar />
      </aside>
      <main id="main" class="container">
        Главная страница
      </main>
      <div class="flash-message"></div>
    </>
  )
}