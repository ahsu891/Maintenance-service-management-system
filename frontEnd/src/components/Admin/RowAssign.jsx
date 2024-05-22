import React from "react";
import { MdRestore } from "react-icons/md";
import { formatDateRelativeToToday } from "../../api/helper";
function RowAssign({
  i,
  title,
  categories,
  request_name,
  technician_name,
  priority,
  status,
  block_no,
  date,
}) {
  return (
    <tr
    // onClick={() => setVisible((c) => !c)}
    >
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{i}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{title}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{categories}</p>
      </td>
      {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{technician_name}</p>
      </td> */}
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {request_name || "Preventive"}
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{block_no}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        {priority === "Low" && (
          <p className=" rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">
            {priority}
          </p>
        )}
        {priority === "Medium" && (
          <p className=" rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
            {priority}
          </p>
        )}
        {priority === "High" && (
          <p className=" rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            {priority}
          </p>
        )}
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        {status === "Assigned" && (
          <p className=" rounded-full  bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium  text-warning">
            {status}
          </p>
        )}

        {status === "Completed" && (
          <p className=" rounded-full  bg-meta-3 bg-opacity-10 py-1 px-3 text-sm font-medium  text-meta-3">
            {status}
          </p>
        )}

        {status === "Rejected" && (
          <p className=" rounded-full  bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium  text-danger">
            {status}
          </p>
        )}
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {formatDateRelativeToToday(date)}
        </p>
      </td>
    </tr>
  );
}

export default RowAssign;
