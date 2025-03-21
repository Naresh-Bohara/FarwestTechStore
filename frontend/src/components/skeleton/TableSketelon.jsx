import React from "react";

export const TableRows = ({rows=5, cols}) => {
  return (
    <>
    {
        [... new Array(rows)].map((_, i)=>(
            <tr key={i}>
       {
        [... new Array(cols)].map((_, j)=>(
            <td key={j} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
            </div>
          </td>
        ))
       }
      </tr>
        ))
    }

    </>
  );
};

