// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
// import BrandFive from '../images/brand/brand-05.svg';

import { useEffect, useState } from "react";
import RowDashboardTable from "./RowDashboardTable";
import axios from "../../api/axios";
const URL_T = "/technicial/getDashTableTech";
const TableOne = () => {
  const [table, setTable] = useState([]);
  useEffect(() => {
    // Function to make the Axios request
    const fetchData = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.post(URL_T, {
          user_id: localStorage.getItem("user_id"),
        });

        // Set the response data to the state
        setTable(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Clean up function (optional)
    return () => {
      // Any cleanup code can go here
    };
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        All Completed Reqeusts
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Title
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Block
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Completion Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>
        {table?.map((t) => (
          <RowDashboardTable
            key={t.request_id}
            category={t.category}
            status={t.status}
            block={t.block_id}
            priority={t.priority}
            title={t.title}
            date={t.completion_date}
          />
        ))}

        {/* <RowDashboardTable /> */}
      </div>
    </div>
  );
};

export default TableOne;