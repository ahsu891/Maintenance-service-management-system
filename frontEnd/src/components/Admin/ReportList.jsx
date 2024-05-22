import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RowReport from "./RowReport";
import ChangetoExcel from "./ChangetoExcel";
import { dateFormating, secondsToHMS } from "../../api/helper";
import { FiFilter } from "react-icons/fi";
import Spiner from "../Spiner";
import Pagination from "./Pagination";
const URL_Rep = "/report/getReport";
const Url_p = "/report/converttoExcel";
function RequestManagement() {
  const [requests, setRequest] = useState([]);
  const [datae, setDatae] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleFilter = () => {
    if (!startDate || !endDate) {
      return;
    }
    const filtered = datae.filter((item) => {
      const itemDate = new Date(item.completion_date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      console.log(end, start, itemDate);
      return itemDate >= start && itemDate <= end;
    });
    setDatae(filtered);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const data = datae;
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Make a GET request to the API endpoint
  //       const response = await axios.get(URL_Rep);
  //       setRequest([...response.data]);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching technicials:", error.message);
  //     }
  //   };
  //   // Call the fetchData function when the component mounts
  //   fetchData();
  // }, []);

  useEffect(
    function () {
      async function fechingData() {
        try {
          setLoading(true);
          // Make a GET request to the API endpoint
          const response = await axios.get(Url_p);
          setDatae(response.data);
          console.log(response.data, "hhhhhh");
          // console.log(response.data);
        } catch (error) {
          console.error("Error fetching technicials:", error.message);
        } finally {
          setLoading(false);
        }
      }
      fechingData();
    },
    [filteredData]
  );

  const filterDataa = datae.map((data, i) => {
    return {
      "#": i + 1,
      category: data.category,
      compl_date: dateFormating(data.completion_date),
      time: secondsToHMS(data.time_took),
      technician_name: data.technicianDetails,
      // block_no: data.block_id,
      requested_by: data.requester_name,
      phone: data.phone || "0970752122",
      matrial: data.materialDetails || "none",
    };
  });

  if (isLoading) {
    return <Spiner />;
  }
  return (
    <div>
      <div className=" my-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-col sm:flex-row gap-1 items-center">
            <div className="flex flex-row items-center">
              <label className="block  text-graydark mb-1">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-gray rounded"
              />
            </div>
            <div className=" flex flex-row items-center">
              <label className="block text-graydark mb-1">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-gray rounded"
              />
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={handleFilter}
                className=" p-2 bg-primary text-white rounded b"
              >
                <span className="flex flex-row items-center gap-2">
                  <FiFilter /> Filter
                </span>
              </button>
              <button
                onClick={() => {
                  setFilteredData((e) => !e);
                  setStartDate("");
                  setEndDate("");
                }}
                className=" p-2 bg-primary text-white rounded b"
              >
                <span className="flex flex-row items-center gap-2">Cancel</span>
              </button>
            </div>
          </div>
        </div>
        <ChangetoExcel className="self-end" filterDataa={filterDataa} />
      </div>
      {datae.length === 0 ? (
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
                    Done Date
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

                {currentData?.map((data, i) => (
                  <RowReport
                    i={i + 1}
                    key={data.request_id}
                    title={data.title}
                    category={data.category}
                    requester_name={data.requester_name}
                    completion_date={data.completion_date}
                    request_id={data.request_id}
                    technician_full_name={data.technicianDetails || "none"}
                  />
                ))}
              </tbody>
            </table>
            <div className=" flex flex-row  justify-end">
              {/* {on && <FormLayout toggle={() => handleOn()} />} */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
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
