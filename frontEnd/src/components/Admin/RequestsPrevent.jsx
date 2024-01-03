import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowRequestPrevent from "./RowRequestPrevent";
import FormPreventive from "./FormPreventive";
const URL_R = "/prevent/getPrevent";
function RequestsPrevent() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_R);
        setData([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [refreshing]);
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
            <p className="text-black dark:text-white">Appointment Date</p>
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
        {data?.map((data, i) => (
          <RowRequestPrevent
            i={i + 1}
            id={data.id}
            block_id={data.block_no}
            floor={data.floor}
            date={data.start_date}
            // request_id={data.request_id}
            // requester_id={data.requester_id}
            room={data.room}
            // status={data.status}
            inv={data.interval_unit}
            rep={data.repetition}
            sin={data.schedule_interval}
            description={data.description}
            key={data.id}
            title={data.title}
            categories={data.categories}
            // name={data.requester_name}
            priority={data.priority}
            setRefreshing={setRefreshing}
            // tech={tech}
            // setRefresh={setRefresh}
          />
        ))}
      </div>

      <div className=" mt-3 mb-2 flex flex-row justify-end">
        <button
          onClick={() => setAdd((e) => !e)}
          className="flex w-auto justify-self-end rounded  bg-primary py-2 px-3 font-medium text-gray"
        >
          {add ? "Cancel" : "+ Add"}
        </button>
      </div>

      <div>
        {add && (
          <FormPreventive setAdd={setAdd} setRefreshing={setRefreshing} />
        )}
      </div>
    </div>
  );
}

export default RequestsPrevent;
