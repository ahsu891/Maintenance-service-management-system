import { useEffect, useState } from "react";
import CardTwo from "../Inventory/CardTwo";
import CardFour from "../Inventory/CardFour";
import axios from "../../api/axios";
import ChartThree from "./ChartThree";
const URL_D = "/report/getDashInv";
const URL_C = "/report/getChartInv";
function DashboardInv() {
  const [data, setData] = useState([]);
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
  useEffect(() => {
    // Function to make the Axios request
    const fetchData = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.get(URL_C);

        // Set the response data to the state
        setChart(response.data);
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
        <CardTwo total_assigned={data?.[0]?.total_inventory || 0} />
        <CardFour
          total_completed={data?.[0]?.low_inventory_count || 0}
          completed_percentage={data?.[0]?.average_quantity_low_inventory || 0}
        />
      </div>
      <div className="my-4">
        <div className="col-span-12 xl:col-span-4">
          <ChartThree
            total_water={chart?.[0]?.total_water || 0}
            water_percentage={chart?.[0]?.water_percentage || 0}
            total_general={chart?.[0]?.total_general || 0}
            general_percentage={chart?.[0]?.general_percentage || 0}
            total_electrical={chart?.[0]?.total_electrical || 0}
            electrical_percentage={chart?.[0]?.electrical_percentage || 0}
            total_other={chart?.[0]?.total_other || 0}
            completed_other={chart?.[0]?.other_percentage || 0}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardInv;
