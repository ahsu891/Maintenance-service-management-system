import { Outlet } from "react-router-dom";
import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
// import Gps from "./Gps";
import CardOne from "../Admin/CardOne";
import CardTwo from "../Admin/CardTwo";
import CardThree from "../Admin/CardThree";
import CardFouor from "../Admin/CardFour";
import ChartOne from "./ChartOne";
import ChartThree from "./ChartThree";
import axios from "../../api/axios";
import Chat from "./Chat";
const URL_D = "/report/getTopDashboard";
const URL_C = "/report/getChartData";
const URL_G = "/report/getDashGraph";
function About() {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState([]);
  const [graph, setGraph] = useState([]);
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
  useEffect(() => {
    // Function to make the Axios request
    const fetchData = async () => {
      try {
        // Make the Axios GET request
        const response = await axios.get(URL_G);

        // Set the response data to the state
        setGraph(response.data);
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne
          total_pending={data?.[0]?.total_pending}
          pending_percentage={data?.[0]?.pending_percentage}
        />
        <CardTwo
          total_assigned={data?.[0]?.total_assigned}
          assigned_percentage={data?.[0]?.assigned_percentage}
        />
        <CardThree
          total_completed={data?.[0]?.total_completed}
          completed_percentage={data?.[0]?.completed_percentage}
        />
        <CardFouor
          total_rejected={data?.[0]?.total_rejected}
          rejected_percentage={data?.[0]?.rejected_percentage}
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <ChartOne graph={graph} />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <ChartThree
            total_water={chart?.[0]?.total_water}
            water_percentage={chart?.[0]?.water_percentage}
            total_general={chart?.[0]?.total_general}
            general_percentage={chart?.[0]?.general_percentage}
            total_electrical={chart?.[0]?.total_electrical}
            electrical_percentage={chart?.[0]?.electrical_percentage}
            total_other={chart?.[0]?.total_other}
            completed_other={chart?.[0]?.other_percentage}
          />
        </div>
      </div>
      <Chat />
    </div>
  );
}

export default About;
