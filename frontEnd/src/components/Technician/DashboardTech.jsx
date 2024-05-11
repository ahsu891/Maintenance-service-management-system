import { useEffect, useState } from "react";
import CardOne from "../Technician/CardOne";
import CardThree from "../Technician/CardThree";
import axios from "../../api/axios";
const URL_D = "/report/getDashTech";
function DashboardTech() {
  const [data, setData] = useState([]);
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
          total_assigned={data?.[0]?.total_assigned}
          assigned_percentage={data?.[0]?.assigned_percentage}
        />
        <CardThree
          total_completed={data?.[0]?.total_completed}
          completed_percentage={data?.[0]?.completed_percentage}
        />
      </div>
    </div>
  );
}

export default DashboardTech;
