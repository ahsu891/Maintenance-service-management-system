import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { handle } from "express/lib/router";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import ModalDelete from "./ModalDelete";
import DeleteOppup from "./DeleteOppup";
const URL_R = "/assign/conform";
const URL_RM = "/assign/getRejectMessage";
const URL_RD = "/assign/cancelReject";
const fetchData = async (request_id, setMessage) => {
  try {
    // Make a GET request to the API endpoint
    const response = await axios.post(URL_RM, {
      request_id,
    });
    // console.log(request_id);
    // console.log(localStorage.getItem("user_id"));
    // console.log(response.data, "dddddddddddd");
    setMessage(response.data);
    //   setList([...response.data]);
  } catch (error) {
    console.error("Error fetching technicials:", error.message);
  }
};
function RequestSingle({
  block_id,
  room,
  request_id,
  title,
  floor,
  phone,
  description,
  requester_name,
  priority,
  status,
  i,
  setReff,
  date,
}) {
  const [message, setMessage] = useState([
    {
      id: "eaba6518",
      message: "",
      request_id: "b98ad56d-537c-4e8d-bddd-acdde35a16f8",
    },
  ]);
  if (status === "Rejected") {
    // Call the fetchData function when the component mounts
    fetchData(request_id, setMessage);
  }
  function handleConform() {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_R, {
          request_id,
        });
        // console.log(request_id);
        // console.log(localStorage.getItem("user_id"));
        // console.log(response.data);
        toast.success(response.data);
        setReff((e) => !e);

        //   setList([...response.data]);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }
  function handleDelete() {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_RD, {
          request_id,
        });
        // console.log(request_id);
        // console.log(localStorage.getItem("user_id"));
        // console.log(response.data);
        toast.success(response.data);
        setReff((e) => !e);

        //   setList([...response.data]);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error("something went wrong");
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }
  console.log(status);
  return (
    <div className="">
      <div
        className={`my-5 w-full relative border-l-4 rounded-md  ${
          status === "Rejected" ? "border-[#F87171] " : " border-primary "
        } ${
          status === "Rejected" ? "bg-[#F87171]" : "bg-white"
        }   bg-opacity-[15%]   transition-all  2s `}
      >
        <div className=" rounded-md border  border-stroke bg-white px-6   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex md:flex-row flex-col justify-between py-4 items-center px-4 pr-7">
            <div>
              <div className="flex flex-row  gap-3 items-center py-2 ">
                <span className=" text-boxdark">{title}</span>
                <span>
                  {" "}
                  {status === "Assigned" && (
                    <p className=" rounded-full   w-auto block-inline  bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium   text-primary">
                      {status}
                    </p>
                  )}
                  {status === "Pending" && (
                    <p className=" rounded-full   w-auto block-inline bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium  text-warning">
                      {status}
                    </p>
                  )}
                  {status === "Completed" && (
                    <p className=" rounded-full   w-auto block-inline bg-meta-3 bg-opacity-10 py-1 px-3 text-sm font-medium  text-meta-3">
                      {status}
                    </p>
                  )}
                  {status === "Rejected" && (
                    <p className=" rounded-full   w-auto block-inline  bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium  text-danger">
                      {status}
                    </p>
                  )}
                </span>
              </div>
              <div className="py-1">
                <div className="flex flex-row items-center gap-2">
                  {/* <span className="text-primary text-lg">
                    <AiOutlineMessage />
                  </span> */}
                  {/* <span className="text-sm">Assign to:</span>
                  <span className="text-sm">Ahmed</span>
                  <span className="text-sm ml-3">0970752122</span> */}
                </div>
              </div>
            </div>
            {/* <div>
              <span>
                {" "}
                <p className=" rounded-full   w-auto block-inline bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium  text-warning">
                  {status}
                </p>
              </span>
            </div> */}
            {status !== "Rejected" && (
              <div className="flex flex-row  gap-6 items-center">
                <div className="flex flex-row gap-1  items-center">
                  <p className=" text-boxdark">
                    If the request is done Please confirm
                  </p>
                  <span className="text-primary animate-fade-right animate-duration-1000 duration-10 hover:translate-x-2 ">
                    <FaArrowRightLong />
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleConform}
                    disabled={status === "Completed" ? false : true}
                    className="bg-primary px-3 py-1 rounded-md text-white"
                  >
                    Conform
                  </button>
                </div>
              </div>
            )}
            {status === "Rejected" && (
              <div className="max-w-[50%]    flex flex-row  gap-6 items-center">
                <div className="flex flex-row gap-1 ">
                  <p className=" text-boxdark">
                    {/* <p className="leading-relaxed text-[#CD5D5D]">
                      Lorem dummy text of the l Lorem, ipsum dolor sit amet
                      consectetur adipisicing elit. Labore perspiciatis
                      necessitatibus, quae error cumque laudantium nobis
                      consequuntur quia incidunt esse eius ut omnis libero,
                      facere temporibus aspernatur hic molestias voluptatibus.
                      printing
                    </p> */}
                    <p className="leading-relaxed text-[#CD5D5D]">
                      {message?.[0].message}
                    </p>
                  </p>
                </div>
              </div>
            )}
            {status === "Rejected" && (
              <div className="   align-bottom self-center">
                <button
                  onClick={handleDelete}
                  className="bg-[#CD5D5D] px-2 py-1 rounded-md text-white"
                >
                  Delete
                </button>
                {/* <DeleteOppup /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestSingle;
