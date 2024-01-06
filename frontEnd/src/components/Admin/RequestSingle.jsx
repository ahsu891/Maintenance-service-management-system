import React, { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { handle } from "express/lib/router";
import axios from "../../api/axios";
import toast from "react-hot-toast";
const URL_R = "/assign/conform";
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
  console.log(status);
  return (
    <div className="">
      <div className="my-5 relative border-l-4 rounded-md border-primary   transition-all  2s ">
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
                  {status === "Cancelled" && (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestSingle;
