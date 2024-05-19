// src/components/JsonToPdf.js
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../images/icon/logo2.png";
import { FaRegFilePdf } from "react-icons/fa";
// Ensure this import is after jsPDF
const ChangetoPdf = ({ jsonData }) => {
  const generatePdf = () => {
    console.log(jsonData, "hhhhh");
    const doc = new jsPDF();
    // doc.setFontSize(40);
    // doc.text("Octonyan loves jsPDF", 35, 25);
    // doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);
    // Define the columns and data for the table
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 30; // Adjust width of the logo as needed
    const logoHeight = 30; // Adjust height of the logo as needed
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logo, "PNG", logoX, 5, logoWidth, logoHeight);
    doc.setFontSize(14);
    doc.text(
      "Wachemo University Maintenance Report",
      (pageWidth - 90) / 2,
      logoHeight + 5 + 4
    );
    const columns = Object.keys(jsonData[0]).map((key) => ({
      header: key,
      dataKey: key,
    }));
    const rows = jsonData.map((row) => ({ ...row }));

    // Add a title to the PDF
    // doc.text("JSON Data Table", 20, 20);
    // console.log(doc);
    // Addd the table to the PDF with custom styles
    doc.autoTable({
      columns,
      body: rows,
      startY: 45,
      headStyles: { fillColor: [0, 128, 0] }, // Header background color (green)
      columnStyles: {
        0: { cellWidth: "auto" }, // Ensure the first column auto-sizes
      },
      styles: { cellWidth: "auto" }, // Apply auto-sizing to all columns
      margin: { top: 30 }, // Margin from the top
    });

    // Save the PDF
    doc.save("table.pdf");
  };

  return (
    <div>
      <button className="  text-white " onClick={generatePdf}>
        <FaRegFilePdf className=" text-danger text-2xl " />
      </button>
    </div>
  );
};

export default ChangetoPdf;
