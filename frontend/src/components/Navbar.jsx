// import logo from "../assets/logo.png"
// import userlogo from "../assets/user.png"
// export default function Navbar() {
//   return (
//     <header className="h-14 bg-primary-dark text-spectrum-white flex justify-between items-center ">
//       {/* <h1 className="font-semibold">User and Teams</h1> */}

//        <div className="flex items-center space-x-2 border rounded-[5px] mr-[16px] my-3">
//                        <img src={logo} alt="Logo" className="w-20 ml-2 my-[3px]" />
//                        <img
//                          src={userlogo}
//                          alt="userlogo"
//                          className="rounded-full scale-70 object-cover object-top w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white"
//                        />
//                      </div>
//     </header>
//   );
// }
// import { IoMdArrowDropdown } from "react-icons/io";
// import logo from "../assets/logo.png";
// import userlogo from "../assets/user.png";

// export default function Navbar({ dropdownOpen, setDropdownOpen, selectedMenu }) {
//   return (
//     <header className="h-16 bg-primary-dark text-spectrum-white flex items-center justify-between relative px-4 border-b border-spectrum-gray4">
//       {/* Left side: Sidebar toggle */}
//       <button
//         onClick={ setDropdownOpen(!dropdownOpen)}
//         className="flex items-center gap-2 h-full px-3 font-medium"
//       >
//         {dropdownOpen ? (
//           <img src={logo} alt="Logo" className="w-20" />
//         ) : (
//           <span className="text-sm">{selectedMenu}</span>
//         )}
//         <IoMdArrowDropdown
//           className={`w-5 h-5 transform transition-transform duration-300 ${
//             dropdownOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Right side: Logo + User */}
//       <div className="flex items-center space-x-2 border rounded-[5px] mr-2 px-2 py-[3px]">
//         <img src={logo} alt="Logo" className="w-20" />
//         <img
//           src={userlogo}
//           alt="userlogo"
//           className="rounded-full scale-70 object-cover object-top w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white"
//         />
//       </div>
//     </header>
//   );
// }




import { Grid, GridItem } from "../components/Grid";
import logo from "../assets/logo.png"
import userlogo from "../assets/user.png"

export default function Navbar() {
  return (
    <header className="h-14 bg-primary-dark text-spectrum-white flex items-center">
      <Grid className="w-full">
        {/* Left: Heading above Sidebar (col 1) */}
        <GridItem colSpan={1} className="flex items-center px-4">
          <h1 className="font-semibold text-sm">
            Users and teams 
          </h1>
        </GridItem>

        {/* Right: Navbar controls (col 5) */}
        <GridItem
          colSpan={5}
          className="flex justify-end items-center "
        >
          {/* <div className="flex items-center gap-4">
            <span className="text-sm">elaniti</span>
          
          </div> */}
           {/* Logos */}
                    <div className="flex items-center space-x-2 border rounded-[5px] mr-[16px]  my-[3px]">
                      <img src={logo} alt="Logo" className="w-20 ml-2 my-[3px]" />
                      <img
                        src={userlogo}
                        alt="userlogo"
                        className="rounded-full scale-70 object-cover object-top w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white"
                      />
                    </div>
        </GridItem>
      </Grid>
    </header>
  );
}
