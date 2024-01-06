import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import { MdLocalGasStation } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function RowAssign({
  i,
  category,
  completion_date,
  request_id,
  title,
  requester_name,
  technician_full_name,
}) {
  const navigate = useNavigate();

  const location = useLocation();

  // console.log(location.pathname);

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
        <p className="text-black dark:text-white">{category}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{technician_full_name}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{requester_name}</p>
      </td>

      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">
          <span
            onClick={() => navigate(location.pathname + `/${request_id}`)}
            className="text-2xl"
          >
            <IoPrintOutline />
          </span>
        </h5>
      </td>
    </tr>
  );
}

export default RowAssign;
