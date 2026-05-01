import { fetchBells } from "../../api/bells";
import PageTitle from "../../shared/PageTitle";
import Sidebar from "../../shared/Sidebar";
import BellsTable from "./components/BellsTable";

export default async function BellsPage() {
  const bells = await fetchBells()

  return (
    <>
      <div class="content">
        <PageTitle title="Звонки" />
        <BellsTable bells={[]} />
      </div>
    </>)

}
