import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { secondsToHMS } from "../../api/helper";
// import { secondsToHMS } from "../../api/helper.js";

const URL_RepS = "/report/getSingleReport";
function ReportPrint() {
  const pdfRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setDate] = useState({});
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight, imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("cotizacion.pdf");
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_RepS, { requestId: id });
        setDate(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [id]);
  console.log(id);
  console.log(data);
  return (
    <>
      <div>
        <div
          ref={pdfRef}
          className="rounded-sm   bg-white px-5  py-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-5"
        >
          <div>
            <h1 className=" pb-2 font-semibold   text-3xl text-center text-black-2">
              Wachemo University Property and General Services Directorate
            </h1>
            <div className=" my-2  bg-form-strokedark h-[1px]  opacity-[50%]"></div>
            {/* <h1>Professional job report submission form</h1> */}
            <h1 className="text-xl font-semibold  text-black-2 text-center mb-5">
              Maintenance Work Done Report
            </h1>
            <div className="flex flex-col gap-6  text-graydark mt-8">
              <div className="flex flex-row gap-1">
                <h1 className="text-black-2  font-semibold ">
                  1. Name of the worker who performed the maintenance:{" "}
                </h1>
                <div className="text-graydark flex flex-row gap-1">
                  {data?.technicianDetails?.map((dataa, i) => (
                    <span key={i}>
                      {i + 1}.{dataa.technician_full_name},
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 text-graydark">
                  <h1 className="text-black-2 font-semibold ">
                    2. Department requesting the maintenance:{" "}
                  </h1>
                  <span>
                    {data?.maintenanceDetails?.[0]?.requester_name}
                    {`(${data?.maintenanceDetails?.[0]?.phone})`}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-1 text-graydark">
                  <h1 className="text-black-2 font-semibold ">
                    3.Type of maintenance conducted:{" "}
                  </h1>
                  <span>{data?.maintenanceDetails?.[0]?.category}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-0 text-graydark">
                  <h1 className="text-black-2 font-semibold ">
                    4.Expenses incurred for the maintenance:{" "}
                  </h1>
                  <div
                    className="flex
                flex-row gap-2"
                  >
                    {data?.materialDetails?.map((dat, i) => (
                      <span key={i * 1 + 288 * 22}>
                        {i + 1}.{dat.detail},
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-1 text-graydark">
                <h1 className=" text-graydark font-semibold ">
                  5.maintenance duration:{" "}
                </h1>
                <span>
                  {secondsToHMS(data?.maintenanceDetails?.[0]?.time_took)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center mt-5 flex flex-row gap-2  justify-between">
          <button
            className="btn text-white px-2 rounded-sm py-2 bg-primary"
            // onClick={downloadPDF}
            onClick={() => navigate(-1)}
          >
            {"<--"} Back
          </button>
          <button
            className="btn text-white px-2 rounded-sm py-2 bg-primary"
            onClick={downloadPDF}
            // onClick={() => navigate(-1)}
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
}
export default ReportPrint;

// ዋቸሞ ዩንቨርስት ንብረትና ጠቅላላ አገልግሎት ዳይሬክቶሬት
// ባለሙያ የስራ ርፖርት ማቅረብያ ቅጽ1
// 1 ሥራዉን የሠራ የባለሙያ ስም --
// 2 ለሥረዉ የጠያቀዉ ክፊል¬
// 3 የሥረዉ አይነት
// 4 ለሥረዉ ወጪ የተደረጉ ዕቃዎች -
// 5 ሥረዉ የተጀመረበት ሠዓት
// 6 ሥረዉ የተአናቀቀበትሠዓት
// ስረው የተሰረለት ክፊል
// ለስረዉ የሰማረዉ የቅርብ ሀላፍ
// ስም----
// ፍርማ
// $7---
// ስም—-
// ፍር -
// ይህ ቅፅ በሶስት ኮፕ ተባዝቶ ለን/ጠቅላላ አገልግሎት ዳ/ደይርክቶር ይሰብካል፡፡
// አስተባባሪ
// 1--
// ቀርብ ሀላፍ
// ፍርማ
// ዝቶ ለን/ጠቅላላ አገልግሎት ዳ/ደይርክቶ

// ዋቸሞ ዩንቨርስት ንብረትና ጠቅላላ አገልግሎት ዳይሬክቶሬት
// ባለሙያ የስራ ርፖርት ማቅረብያ ቅጽ1
// 1 ሥራዉን የሠራ የባለሙያ ስም --
// 2 ለሥረዉ የጠያቀዉ ክፊል¬
// 3 የሥረዉ አይነት
// 4 ለሥረዉ ወጪ የተደረጉ ዕቃዎች -
// 5 ሥረዉ የተጀመረበት ሠዓት
// 6 ሥረዉ የተአናቀቀበትሠዓት
// ስረው የተሰረለት ክፊል
// ለስረዉ የሰማረዉ የቅርብ ሀላፍ
// ስም----
// ፍርማ
// $7---
// ስም—-
// ፍር -
// ይህ ቅፅ በሶስት ኮፕ ተባዝቶ ለን/ጠቅላላ አገልግሎት ዳ/ደይርክቶር ይሰብካል፡፡
// አስተባባሪ
// 1--
// ቀርብ ሀላፍ
// ፍርማ
// ዝቶ ለን/ጠቅላላ አገልግሎት ዳ/ደይርክቶ
