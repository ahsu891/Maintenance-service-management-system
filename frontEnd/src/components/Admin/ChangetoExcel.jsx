import React, { useState } from "react";
import ExportJsonToExcel from "./ExportJsonToExcel";
import axios from "../../api/axios";
import { dateFormating, secondsToHMS } from "../../api/helper";
const Url_p = "/report/converttoExcel";
const ChangetoExcel = () => {
  // Sample JSON data
  const [datae, setDatae] = useState([]);
  async function fechingData() {
    try {
      // Make a GET request to the API endpoint
      const response = await axios.get(Url_p);
      setDatae(response.data);
      console.log(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching technicials:", error.message);
    }
  }
  // Call the fetchData function when the component mounts

  const data = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Doe", age: 25, email: "jane@example.com" },
    // Add more data as needed
  ];

  const filterData = datae.map((data) => {
    return {
      title: data.title,
      category: data.category,
      finished_date: dateFormating(data.completion_date),
      time: secondsToHMS(data.time_took),
      technicians_name: data.technicianDetails,
      block_no: data.block_id,
      requested_by: data.requester_name,
      requester_phone: data.phone || "0970752122",
      occupation: data.job || "MTL",
    };
  });
  //   console.log(filterData);

  return (
    <div>
      <h1 onClick={fechingData}>Export JSON to Excel Example </h1>
      <ExportJsonToExcel jsonData={filterData} />
    </div>
  );
};

export default ChangetoExcel;
