import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowReport from "./RowReport";
const URL_Rep = "/report/getReport";

function RequestManagement() {
  const [requests, setRequest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(URL_Rep);
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
      {requests.length === 0 ? (
        <div className="flex flex-row justify-center items-center rounded-md  px-4   pb-6 sm:px-7.5 xl:pb-1">
          <span className="py-2">No data to display.</span>
        </div>
      ) : (
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
                    Done by
                  </th>
                  <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                    Requested by
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

                {requests?.map((data, i) => (
                  <RowReport
                    i={i + 1}
                    key={data.request_id}
                    title={data.title}
                    category={data.category}
                    requester_name={data.requester_name}
                    completion_date={data.completion_date}
                    request_id={data.request_id}
                    technician_full_name={data.technician_full_name}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* < */}
      <div className="my-5">
        {/* {on && <FormLayout toggle={() => handleOn()} />} */}
      </div>
    </div>
  );
}

export default RequestManagement;
