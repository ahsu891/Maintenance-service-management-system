import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CardOne from "./CardOne";
import CardThree from "./CardThree";
const URL_D = "/requester/getDashboardSuper";
function DashboardSuper() {
  const [data, setData] = useState([{ totalAssigned: 4, total_completed: 0 }]);
  const [chart, setChart] = useState([]);

  // useEffect hook to make the Axios request when the component mounts
  useEffect(() => {
    // Function to make the Axios request
    const fetchData = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.get(URL_D);

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
          total_assigned={data?.[0]?.total_users || 0}
          //   assigned_percentage={data?.[0]?.assigned_percentage || 0}
        />

        <CardThree
          total_completed={data?.[0]?.total_technicians || 0}
          //   percenteg={
          //     (data?.[0]?.total_completed * 100) /
          //     (data?.[0]?.total_completed + data?.[0]?.totalAssigned)
          //   }
        />
      </div>
    </div>
  );
}

export default DashboardSuper;
