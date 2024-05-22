import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { MdPhone } from "react-icons/md";
import SwitcherTwo from "./SwitcherTwo";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import DeleteOppup from "./DeleteOppup";
const URLDEL = "/technicial/deleteTech";
const URL_T = "/technicial/toggle";
function Row({ name, categories, status, phone, technicial_id, setRef, i }) {
  const [isLoading, setLoading] = useState(false);

  function TechDelete() {
    setLoading((e) => !e);
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.delete(URLDEL + `/${technicial_id}`);
        // console.log(response.data);
        toast.success(response.data.message);
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
  function Toggle() {
    setLoading((e) => !e);
    const fetchData = async () => {
      let toggle;
      if (status === "active") {
        toggle = "inactive";
      }
      if (status !== "active") {
        toggle = "active";
      }
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_T + `/${technicial_id}`, {
          toggle,
        });
        // console.log(response.data);
        toast.success(response.data.message);
        setLoading((e) => !e);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error("Error Toggling");
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
        <p className="text-black dark:text-white">{categories}</p>
      </td>
      <td className="border-b border-[#eee]  ir py-5 px-4 dark:border-strokedark">
        <div className=" flex flex-row items-center gap-1">
          <button className=" hover:text-primary  ">
            <MdPhone className="text-2xl " />
          </button>
          <p className="text-black dark:text-white">{phone}</p>
        </div>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        {status === "active" ? (
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            {status}
          </p>
        ) : (
          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            {status}
          </p>
        )}
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => {
              Toggle();
              setRef((r) => !r);
            }}
            className="hover:text-primary"
          >
            {status === "active" ? (
              <IoToggle className="text-2xl text-success" />
            ) : (
              <IoToggle className="text-2xl text-danger" />
            )}
          </button>
          {/* <SwitcherTwo key={name} /> */}

          <DeleteOppup
            className="text-2xl"
            Delts={() => {
              TechDelete();
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
