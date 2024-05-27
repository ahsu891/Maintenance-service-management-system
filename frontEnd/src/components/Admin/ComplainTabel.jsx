import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowAssign from "./RowAssign";
import RowComplain from "./RowComplain";
import Spiner from "../Spiner";
import Pagination from "./Pagination";
import SearchBarComplain from "./SearchBarComplain";
const URL_R = "/technicial/getTechicianName";
function ComplainTabel() {
  const [requests, setRequest] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [freshh, setFresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFilterd, setDataFilterd] = useState([]);
  const data = requests;
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make a GET request to the API endpoint
        const response = await axios.get(URL_R);
        setRequest([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [freshh]);

  if (isLoading) {
    return <Spiner />;
  }
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <SearchBar technicials={technicials} setfiltered={setfiltered} /> */}

        {requests.length > 0 && (
          <SearchBarComplain
            list={currentData}
            setFilterdData={setDataFilterd}
          />
        )}
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
                  <th className="min-w-[60px] py-4 px-4 font-medium text-black dark:text-white">
                    Action
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
                {dataFilterd.map((data, i) => (
                  <RowComplain
                    i={i + 1}
                    key={data.request_id}
                    title={data.title}
                    request_id={data.request_id}
                    description={data.description}
                    technician_name={data.technician_name}
                    setFresh={setFresh}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* < */}
      <div className=" flex flex-row  justify-end">
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

export default ComplainTabel;
