import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { MdPhone } from "react-icons/md";
// import SwitcherTwo from "./SwitcherTwo";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import DeleteOppup from "../Admin/DeleteOppup";
const URLDEL = "/requester/deleteRequester";
const URL_T = "/technicial/toggle";
function Row({ name, categories, position, phone, user_id, setRef, i }) {
  const [isLoading, setLoading] = useState(false);

  function TechDelete(user_id) {
    setLoading((e) => !e);
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URLDEL, {
          user_id: user_id,
        });
        // console.log(response.data);
        toast.success(response.data);
        setLoading((e) => !e);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error("Error Deleting");
        setLoading((e) => !e);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }

  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{i}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{name}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{phone}</p>
      </td>
      <td className="border-b border-[#eee]  ir py-5 px-4 dark:border-strokedark">
        <div className=" flex flex-row items-center gap-1">
          <button className=" hover:text-primary  ">
            <MdPhone className="text-2xl " />
          </button>
          <p className="text-black dark:text-white">{position}</p>
        </div>
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          {/* <SwitcherTwo key={name} /> */}

          <DeleteOppup
            className="text-2xl"
            Delts={() => {
              TechDelete(user_id);
              setRef((r) => !r);
            }}
          />
          {/* <button className="hover:text-primary">
            <MdModeEditOutline className="text-2xl" />
          </button> */}
        </div>
      </td>
    </tr>
  );
}

export default Row;
