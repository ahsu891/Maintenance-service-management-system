import React, { useEffect, useState } from "react";
import ExportJsonToExcel from "./ExportJsonToExcel";
import ChangetoPdf from "./ChangetoPdf";
import axios from "../../api/axios";
import { dateFormating, secondsToHMS } from "../../api/helper";
const Url_p = "/report/converttoExcel";
const ChangetoExcel = ({ filterDataa }) => {
  // Sample JSON data
  const [datae, setDatae] = useState([]);

  // Call the fetchData function when the component mounts

  useEffect(function () {
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
    fechingData();
  }, []);

  // const filterData = datae.map((data, i) => {
  //   return {
  //     "#": i + 1,
  //     category: data.category,
  //     compl_date: dateFormating(data.completion_date),
  //     time: secondsToHMS(data.time_took),
  //     technician_name: data.technicianDetails,
  //     // block_no: data.block_id,
  //     requested_by: data.requester_name,
  //     phone: data.phone || "0970752122",
  //     matrial: data.materialDetails || "none",
  //   };
  // });
  //   console.log(filterData);

  return (
    <div>
      <div className="flex flex-row gap-2  items-center mr-3">
        <p className="mb-1 text-primary text-lg">Export to :</p>
        <ExportJsonToExcel jsonData={filterDataa} />
        <ChangetoPdf jsonData={filterDataa} />
      </div>
    </div>
  );
};

export default ChangetoExcel;
