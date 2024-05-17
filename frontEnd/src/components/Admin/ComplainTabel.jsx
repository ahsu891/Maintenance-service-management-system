import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowAssign from "./RowAssign";
import RowComplain from "./RowComplain";
const URL_R = "/technicial/getTechicianName";
function ComplainTabel() {
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
        {requests.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              {/* <h2 className="text-xl font-semibold mb-2">No Request Yet </h2> */}
              <p className="text-gray-500 pb-6">
                Sorry, there is no data to display.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    #
                  </th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Request Title
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Description
                  </th>
                  <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                    Assign To
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
                  <RowComplain
                    i={i + 1}
                    key={data.request_id}
                    title={data.title}
                    description={data.description}
                    requester_full_name={data.requester_full_name}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* < */}
      <div className="my-5">
        {/* {on && <FormLayout toggle={() => handleOn()} />} */}
      </div>
    </div>
  );
}

export default ComplainTabel;
