import { fetchBells } from "../../api/bells";
import PageTitle from "../../components/shared/PageTitle";
import Sidebar from "../../components/shared/Sidebar";
import BellsTable from "./components/BellsTable";

export default async function BellsPage() {
  const bells = await fetchBells()

  return (
    <>
      <div className="content">
        <PageTitle title="Звонки" />
        <BellsTable bells={[]} />
      </div>
    </>)

}
