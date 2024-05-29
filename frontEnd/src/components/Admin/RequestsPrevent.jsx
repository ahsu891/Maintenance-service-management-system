import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowRequestPrevent from "./RowRequestPrevent";
import FormPreventive from "./FormPreventive";
import RequestSingle from "./RequestSingle";
import Spiner from "../Spiner";
import Pagination from "./Pagination";
import SearchBarPreventive from "./SearchBarPreventive";
const URL_R = "/prevent/getPrevent";
const URL_RC = "/prevent/getPreventConf";
function RequestsPrevent() {
  const [isLoadin, setLoading] = useState(false);
  const [isLoadins, setLoadings] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [refreshingC, setRefreshingC] = useState(false);
  const [dataC, setDataC] = useState([]);
  const [add, setAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFilterd, setDataFilterd] = useState([]);
  const datar = data;
  const rowsPerPage = 5;
  const totalPages = Math.ceil(datar.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = datar.slice(indexOfFirstRow, indexOfLastRow);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_R);
        setData([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [refreshing]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadings(true);
        // Make a GET request to the API endpoint
        const response = await axios.get(URL_RC);
        setDataC([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      } finally {
        setLoadings(false);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [refreshingC]);
  if (isLoadin || isLoadins) {
    return <Spiner />;
  }
  return (
    <div>
      {dataC?.map((data, i) => (
        <RequestSingle
          i={i + 1}
          request_id={data.request_id}
          // block_id={data.block_no}
          // floor={data.floor}
          // date={data.start_date}
          // request_id={data.request_id}
          // requester_id={data.requester_id}
          // room={data.room}
          status={data.status}
          // inv={data.interval_unit}
          // rep={data.repetition}
          // sin={data.schedule_interval}
          // description={data.description}
          key={data.request_id}
          title={data.title}
          // categories={data.categories}
          // name={data.requester_name}
          // priority={data.priority}
          setReff={setRefreshingC}
          // tech={tech}
          // setRefresh={setRefresh}
        />
      ))}

      <div className=" mt-3 mb-2 flex flex-row justify-end">
        <button
          onClick={() => setAdd((e) => !e)}
          className="flex w-auto justify-self-end rounded  bg-primary py-2 px-3 font-medium text-gray"
        >
          {add ? "Cancel" : "+ Add"}
        </button>
      </div>
      <div className="my-2 px-4">
        {add && (
          <FormPreventive setAdd={setAdd} setRefreshing={setRefreshing} />
        )}
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <SearchBar technicials={technicials} setfiltered={setfiltered} /> */}
        {data.length > 0 && (
          <SearchBarPreventive
            list={currentData}
            setFilterdData={setDataFilterd}
          />
        )}
        {data.length === 0 ? (
          <div className="flex flex-row justify-center items-center rounded-md  px-4   pb-6 sm:px-7.5 xl:pb-1">
            <span className="py-2">No data to display.</span>
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto">
            <div className=" grid grid-cols-[30px,1.5fr,1fr]  sm:grid-cols-[30px,1.5fr,1fr,1fr,0.7fr,0.7fr]  border-b border-[#eee]  items-center   gap-8 bg-gray-2 text-left dark:bg-meta-4  font-medium text-black dark:text-white ">
              <div className=" py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">#</h5>
              </div>
              <div className=" py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  Title
                </h5>
              </div>
              <div className=" hidden sm:block py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">Categories</p>
              </div>
              <div className=" hidden sm:block  py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">Appointment Date</p>
              </div>
              <div className=" hidden sm:block  ir py-5 px-4 dark:border-strokedark">
                <div className=" flex flex-row items-center gap-1">
                  <p className=" inline-flex rounded-fullpy-1 px-3 text-sm font-medium ">
                    Priority
                  </p>
                </div>

                {/* Additional grid items can be added here */}
              </div>
              <div className=" py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">Action</p>
              </div>
            </div>
            {dataFilterd?.map((data, i) => (
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
        )}
        {/* <div className=" flex flex-row justify-end my-4">
            <button
            onClick={handleOn}
            className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
            >
              {on ? "Cancel" : "Add Member"}
            </button>
          </div> */}

        {/* < */}
      </div>
      <div className=" my-1 flex flex-row  justify-end">
        {/* {on && <FormLayout toggle={() => handleOn()} />} */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default RequestsPrevent;
