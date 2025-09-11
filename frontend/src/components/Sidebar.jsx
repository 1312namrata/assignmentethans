// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   const menu = [
//     { name: "Directory", path: "/directory" },
//     { name: "Approve Users", path: "/approve-users" },
//     { name: "Roles", path: "/roles" },
//     { name: "Tenants", path: "/tenants" },
//     { name: "Farms & Fields", path: "/farms" },
//     { name: "Invite a User", path: "/invite" },
//   ];

//   return (
//     <aside className="w-[320px] bg-[#f8f9fc] h-full border-r">
//       <nav className="flex flex-col p-4 space-y-2">
//         {menu.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `px-3 py-2 rounded-md ${
//                 isActive
//                   ? "bg-blue-100 text-blue-700 font-semibold"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`
//             }
//           >
//             {item.name}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const topMenu = [
    { name: "Directory", path: "/userandteams/directory" },
    { name: "Approve Users", path: "/userandteams/approve-users" },
    { name: "Roles", path: "/userandteams/roles" },
    { name: "Tenants", path: "/userandteams/tenants" },
  ];

  const bottomMenu = [
    { name: "Farms & Fields", path: "/userandteams/farmsandfields" },
    { name: "Invite a User", path: "/userandteams/invite" },
  ];

  return (
    <div className="h-full flex flex-col bg-primary-light2 text-spectrum-black border-r border-spectrum-white">
      {/* Top navigation */}
      <div className="p-4 space-y-2 border-t border-spectrum-white">
        {topMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2  border-b border-spectrum-white2  border-l-[5px] ${
                isActive
                  ? "bg-spectrum-white2 text-spectrum-gray4 border border-l-[#9D007B] font-semibold"
                  : "border-l-transparent"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Middle auto spacer */}
      <div className="flex-1" />

      {/* Bottom navigation */}
      <div className="p-4 pb-8 space-y-2 border-spectrum-white">
        {bottomMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2  border-b border-spectrum-white border-l-[5px] ${
                isActive
                  ? "bg-spectrum-white text-spectrum-gray4  border-l-[#9D007B] font-semibold"
                  : " border-l-transparent "
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
