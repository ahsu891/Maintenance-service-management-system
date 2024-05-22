import React from "react";
import { MdRestore } from "react-icons/md";
import { formatDateRelativeToToday } from "../../api/helper";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import DeleteOppup from "./DeleteOppup";
const Url_d = "/request/deleteComplain";
function RowComplain({
  i,
  title,
  description,
  setFresh,
  request_id,
  requester_full_name,
  technician_name,
}) {
  async function handleDelte(request_id) {
    try {
      const response = await axios.post(Url_d, {
        request_id,
      }); // Replace with your API endpoint
      // Refresh data after deletion
      toast.success(response.data);
      setFresh((e) => !e);
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(error.response.data.message);
    }
  }

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
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        {/* <p className="text-black dark:text-white">{technician_name}</p> */}
        <DeleteOppup Delts={() => handleDelte(request_id)} />
      </td>
    </tr>
  );
}

export default RowComplain;
