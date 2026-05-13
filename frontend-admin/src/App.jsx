import Sidebar from "./shared/Sidebar";
import ContextMenu from "./ui/ContextMenu";

export default function App() {
  return (
    <>
      <aside id="sidebarContainer">
        <Sidebar />
      </aside>
      <main id="main" class="container">
      </main>
      <div class="flash-message"></div>
      <ContextMenu />
    </>
  )
}