import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Kanban = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};
