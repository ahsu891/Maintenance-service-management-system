import React from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
const ExportJsonToExcel = ({ jsonData }) => {
  const exportToExcel = () => {
    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export the Excel file
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <div>
      <button className="  text-white " onClick={exportToExcel}>
        <SiMicrosoftexcel className="  text-meta-3 text-2xl " />
      </button>
    </div>
  );
};

export default ExportJsonToExcel;
