import { useEffect, useState } from "react";
import CardOne from "../Technician/CardOne";
import CardThree from "../Technician/CardThree";
import axios from "../../api/axios";
import TableOne from "./TableOne";
const URL_D = "/report/getDashTech";
function DashboardTech() {
  const [data, setData] = useState([{ totalAssigned: 4, total_completed: 0 }]);
  const [chart, setChart] = useState([]);

  // useEffect hook to make the Axios request when the component mounts
  useEffect(() => {
    // Function to make the Axios request
    const fetchData = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.post(URL_D, {
          tech_id: localStorage.getItem("user_id"),
        });

        // Set the response data to the state
        setData(response.data);
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
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <CardOne
          total_assigned={data?.[0]?.totalAssigned || 0}
          assigned_percentage={data?.[0]?.assigned_percentage || 0}
        />

        <CardThree
          total_completed={data?.[0]?.total_completed || 0}
          percenteg={
            (data?.[0]?.total_completed * 100) /
            (data?.[0]?.total_completed + data?.[0]?.totalAssigned)
          }
        />
      </div>
      <div className="my-4">
        <div className="col-span-12 xl:col-span-8 my-2">
          <TableOne />
        </div>
      </div>
    </div>
  );
}

export default DashboardTech;
