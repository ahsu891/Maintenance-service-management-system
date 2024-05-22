import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { handle } from "express/lib/router";
// import { AiOutlineMessage } from "react-icons/ai";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import ModalRquesterAccepter from "./ModalRquesterAccepter";
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

  function handleConform(request_id) {
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

  return (
    <div>
      <div
        className={`my-5 w-full relative border-l-4 rounded-md  ${
          status === "Rejected" ? "border-[#F87171] " : " border-primary "
        } ${
          status === "Rejected" ? "bg-[#F87171]" : "bg-white"
        }   bg-opacity-[15%]   transition-all  2s `}
      >
        <div className=" rounded-md border  border-stroke  px-6   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex lg:flex-row flex-col justify-between py-4  md:items-center px-4 pr-7">
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
            {/* <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                    fill="#ffffff"
                    stroke="#ffffff"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                <h5 className="mb-3 font-semibold text-[#B45454]">
                  There were 1 errors with your submission
                </h5>
                <ul>
                  <li className="leading-relaxed text-[#CD5D5D]">
                    Lorem Ipsum is simply dummy text of the printing
                  </li>
                </ul>
              </div>
            </div> */}
            {status !== "Rejected" && (
              <div className="flex lg:flex-row flex-col gap-6 items-center">
                <div className="flex flex-row gap-1  items-center">
                  <p className=" text-boxdark">
                    If the request is done Please confirm
                  </p>
                  <span className="text-primary animate-fade-right animate-duration-1000 duration-10 hover:translate-x-2 ">
                    <FaArrowRightLong />
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <button
                    onClick={() => handleConform(request_id)}
                    disabled={status === "Completed" ? false : true}
                    className="bg-primary px-3 py-1 rounded-md text-white"
                  >
                    Conform
                  </button>
                  <span className="">
                    <ModalRquesterAccepter
                      request_id={request_id}
                      setReff={setReff}
                      status={status}
                      handleConform={handleConform}
                    />
                  </span>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestSingle;
