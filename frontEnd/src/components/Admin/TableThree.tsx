import React, { useEffect, useState } from "react";
import Row from "./Row";
import DropDown from "./DropDown";
import axios from "../../api/axios";
import SearchBar from "./SearchBar";
// bg-danger bg-warning

const URL = "/technicial/getTechnicials";
const TableThree = () => {
  const [technicials, setTechnicials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(URL);
        setTechnicials(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5  pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <SearchBar />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
            {technicials.map((data) => {
              return (
                <Row
                  key={data.technician_id}
                  name={`${data.first_name} ${data.last_name}`}
                  categories={data.specialization}
                  status={data.available}
                  phone={data.phone}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
