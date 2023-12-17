import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowRequest from "./RowRequest";

const URL = "/request/getRequests";
const URL_R = "/technicial/getTechnicials";
const RequestTable = () => {
  const [requests, setRequest] = useState([]);
  const [tech, setTech] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(URL);
        setRequest([...response.data]);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(URL_R);
        setTech([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // useEffect(() => {
  //   setfiltered(technicials);
  // }, [technicials]);
  // console.log(filtered);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* <SearchBar technicials={technicials} setfiltered={setfiltered} /> */}

      {/* <div className=" flex flex-row justify-end my-4">
          <button
            onClick={handleOn}
            className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
          >
            {on ? "Cancel" : "Add Member"}
          </button>
        </div> */}

      {/* < */}
      <div className="max-w-full overflow-x-auto">
        <div className=" grid grid-cols-[30px,1.5fr,1fr,1fr,0.7fr]  border-b border-[#eee]  items-center   gap-8 bg-gray-2 text-left dark:bg-meta-4  font-medium text-black dark:text-white ">
          <div className=" py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
            <h5 className="font-medium text-black dark:text-white">#</h5>
          </div>
          <div className=" py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
            <h5 className="font-medium text-black dark:text-white">Title</h5>
          </div>
          <div className=" py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">Categories</p>
          </div>
          <div className=" py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">Requested By</p>
          </div>
          <div className="  ir py-5 px-4 dark:border-strokedark">
            <div className=" flex flex-row items-center gap-1">
              <p className=" inline-flex rounded-fullpy-1 px-3 text-sm font-medium ">
                Priority
              </p>
            </div>

            {/* Additional grid items can be added here */}
          </div>
        </div>
        {requests?.map((data, i) => (
          <RowRequest
            i={i + 1}
            block_id={data.block_id}
            floor={data.floor}
            phone={data.phone}
            date={data.request_date}
            request_id={data.request_id}
            requester_id={data.requester_id}
            room={data.room}
            status={data.status}
            description={data.description}
            key={data.request_id}
            title={data.title}
            categories={data.category}
            name={data.requester_name}
            priority={data.priority}
            tech={tech}
            setRefresh={setRefresh}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestTable;
