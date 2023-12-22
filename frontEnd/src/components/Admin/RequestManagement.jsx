import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowAssign from "./RowAssign";
const URL_R = "/request/getRequestsAssign";
function RequestManagement() {
  const [requests, setRequest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(URL_R);
        setRequest([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <SearchBar technicials={technicials} setfiltered={setfiltered} /> */}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Categories
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                  Assign to
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                  Requested by
                </th>
                <th className="min-w-[70px] py-4 px-4 font-medium text-black dark:text-white">
                  Block no
                </th>
                <th className="min-w-[70px] py-4 px-4 font-medium text-black dark:text-white">
                  Priority
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {filtered?.map((input, i) => {
              return (
                <Row
                  i={i + 1}
                  key={input.technician_id}
                  technicial_id={input.technician_id}
                  name={`${input.first_name} ${input.last_name}`}
                  categories={input.specialization}
                  status={input.available}
                  phone={input.phone}
                  setRef={setRef}
                />
              );
            })} */}
              {requests.map((data, i) => (
                <RowAssign
                  i={i + 1}
                  key={data.assignment_date}
                  title={data.title}
                  categories={data.specialization}
                  request_name={data.requester_name}
                  technician_name={data.technician_name}
                  priority={data.priority}
                  status={data.status}
                  block_no={data.block_id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* < */}
      <div className="my-5">
        {/* {on && <FormLayout toggle={() => handleOn()} />} */}
      </div>
    </div>
  );
}

export default RequestManagement;
