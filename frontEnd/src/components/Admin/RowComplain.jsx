import React from "react";
import { MdRestore } from "react-icons/md";
import { formatDateRelativeToToday } from "../../api/helper";
function RowComplain({
  i,
  title,
  description,

  requester_full_name,
  technician_name,
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
        <p className="text-black dark:text-white">{description}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{technician_name}</p>
      </td>
    </tr>
  );
}

export default RowComplain;
