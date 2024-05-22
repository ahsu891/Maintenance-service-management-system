import React, { useEffect, useState } from "react";
import Row from "./Row";
// import DropDown from "./DropDown";
import axios from "../../api/axios";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import FormLayout from "./FormLayout";
import Spiner from "../Spiner";
import Pagination from "./Pagination";
// import { use } from "express/lib/application";
// import SignIn from "../auth/SignIn";
// bg-danger bg-warning
// import SignUp from "../auth/SignUp";
const URL = "/technicial/getTechnicials";
const TableThree = () => {
  const [technicials, setTechnicials] = useState([]);
  const [on, setOne] = useState(false);
  const [filtered, setfiltered] = useState([]);
  const [ref, setRef] = useState(false);
  const [isLoading, setLoading] = useState(false);
  function handleOn() {
    setOne((e) => !e);
  }
  console.log(typeof handleOn);
  const [currentPage, setCurrentPage] = useState(1);
  const data = filtered;
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
        // Make a GET request to the API endpoint
        setLoading(true);
        const response = await axios.get(URL);
        setTechnicials(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [ref, on]);

  useEffect(() => {
    setfiltered(technicials);
  }, [technicials]);
  // console.log(filtered);
  if (isLoading) {
    return <Spiner />;
  }
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <SearchBar technicials={technicials} setfiltered={setfiltered} />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Categories
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  phone
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
              {currentData?.map((input, i) => {
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
              })}
            </tbody>
          </table>
        </div>
        <div className=" flex flex-row justify-end my-4">
          <button
            onClick={handleOn}
            className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
          >
            {on ? "Cancel" : "Add Member"}
          </button>
        </div>
      </div>
      <div className=" flex flex-row  justify-end">
        {/* {on && <FormLayout toggle={() => handleOn()} />} */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {/* < */}
      <div className="my-5">
        {on && <FormLayout toggle={() => handleOn()} />}
      </div>
    </div>
  );
};

export default TableThree;
