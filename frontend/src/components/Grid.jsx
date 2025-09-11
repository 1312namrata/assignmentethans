// // components/Grid.jsx
// const colSpanClasses = {
//   1: "col-span-1",
//   2: "col-span-2",
//   3: "col-span-3",
//   4: "col-span-4",
//   5: "col-span-5",
//   6: "col-span-6",
// };

// export function Grid({ children }) {
//   return (
//     <div className="mx-[48px] grid grid-cols-6 gap-6">
//       {children}
//     </div>
//   );
// }

// export function GridItem({ children, colSpan = 6 }) {
//   return (
//     <div className={colSpanClasses[colSpan]}>
//       {children}
//     </div>
//   );
// }


// components/Grid.js
// export function Grid({ children }) {
//   return (
//     <div className="mx-[48]"> {/* 24px left + 24px right */}
//       <div className="grid grid-cols-6 gap-6">
//         {children}
//       </div>
//     </div>
//   );
// }

// export function GridItem({ colSpan = 6, children }) {
//   return (
//     <div className={`col-span-${colSpan}`}>
//       {children}
//     </div>
//   );
// }
// import clsx from "clsx";

// export function Grid({ children }) {
//   return (
//     <div className=" grid grid-cols-6 w-full">
//       {children}
//     </div>
//   );
// }

// export function GridItem({ colSpan = 1, children }) {
//   // ✅ Explicit mapping so Tailwind generates the classes
//   const colSpanClasses = {
//     1: "col-span-1",
//     2: "col-span-2",
//     3: "col-span-3",
//     4: "col-span-4",
//     5: "col-span-5",
//     6: "col-span-6",
//   };

//   return <div className={clsx(colSpanClasses[colSpan])}>{children}</div>;
// }


// import clsx from "clsx";

// export function Grid({ children, className }) {
//   return (
//     <div
//       className={clsx(
//         "grid grid-cols-6 w-full h-full", 
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridItem({ colSpan = 1, children, className }) {
//   return (
//     <div className={clsx(`col-span-${colSpan}`, className)}>
//       {children}
//     </div>
//   );
// }

// Grid.jsx
import clsx from "clsx";

export function Grid({ children, overlay = false, className }) {
  return (
    <div
      className={clsx(
        "grid grid-cols-6 h-full w-full   mx-auto",
        overlay && "fixed inset-0 pointer-events-none z-[9999]",
       
      )}
    >
      {overlay
        ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-l border-r border-red-400/40 bg-red-400/10"
            />
          ))
        : children}
    </div>
  );
}

export function GridItem({ colSpan = 1, children, className }) {
  return (
    <div className={clsx(`col-span-${colSpan}`, className)}>
      {children}
    </div>
  );
}







