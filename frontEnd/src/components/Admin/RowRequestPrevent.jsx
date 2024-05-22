import { formatDateRelativeToToday } from "../../api/helper";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import FormPreventiveEdit from "./FormPreventiveEdit";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import DeleteOppup from "./DeleteOppup";
const URL_D = "/prevent/deletePrevent";
function RowRequestPrevent({
  block_id,
  floor,
  phone,
  date,
  request_id,
  requester_id,
  room,
  status,
  description,
  i,
  title,
  categories,
  name,
  priority,
  id,
  tech,
  rep,
  sin,
  inv,
  setRefreshing,
}) {
  function handleDelet() {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.delete(URL_D + `/${id}`);
        toast.success(response.data);
        setRefreshing((e) => !e);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error(error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }

  const [on, setOn] = useState(false);
  return (
    <div className="mb-4">
      <div
        // onClick={() => setVisible((c) => !c)}
        className="grid  grid-cols-[30px,1.5fr,1fr]  sm:grid-cols-[30px,1.5fr,1fr,1fr,0.7fr,0.7fr]    gap-8"
      >
        <div className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11 flex flex-row items-center">
          <h5 className="font-medium text-black dark:text-white">{i}</h5>
        </div>
        <div className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 flex flex-row items-center">
          <h5 className="font-medium text-black dark:text-white  ">{title}</h5>
        </div>
        <div className=" hidden border-b border-[#eee] py-5 px-4 dark:border-strokedark sm:flex flex-row items-center">
          <p className="text-black dark:text-white">{categories}</p>
        </div>
        <div className="hidden border-b border-[#eee] py-5 px-4 dark:border-strokedark sm:flex flex-row items-center">
          <p className="text-black dark:text-white">
            {formatDateRelativeToToday(date)}
          </p>
        </div>
        <div className="hidden border-b border-[#eee]  ir py-5 px-4 dark:border-strokedark sm:flex flex-row items-center">
          <div className=" flex flex-row items-center gap-1">
            {}
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
          </div>
        </div>
        <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex flex-row items-center">
          <div className="flex flex-row gap-2 text-2xl">
            <span
              onClick={() => setOn((e) => !e)}
              className="hover:text-primary"
            >
              <MdEdit />{" "}
            </span>

            <DeleteOppup
              Delts={() => {
                setRefreshing((e) => !e);
                handleDelet();
              }}
            />
          </div>
        </div>
      </div>
      <div className=" my-3">
        {on && (
          <FormPreventiveEdit
            title={title}
            date={date}
            floor={floor}
            rep={rep}
            sin={sin}
            inv={inv}
            room={room}
            categories={categories}
            priority={priority}
            block={block_id}
            description={description}
            id={id}
            setRefreshing={setRefreshing}
            setOn={setOn}
          />
        )}
      </div>
    </div>
  );
}

export default RowRequestPrevent;
