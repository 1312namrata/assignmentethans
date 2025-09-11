

// export default UserAndTeams;
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main area: Sidebar + Content */}
      <div className="flex flex-1 mx-auto w-full">
        {/* Sidebar (1/6 width) */}
        <aside className="basis-1/6 shrink-0">
          <Sidebar />
        </aside>

        {/* Content (5/6 width) */}
        <main className="basis-5/6 overflow-auto bg-primary-light1 pt-4 pb-[14px] px-6">
          {/* White panel */}
          <div className="w-full min-h-full rounded border border-spectrum-gray2 bg-spectrum-white2 px-6 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

