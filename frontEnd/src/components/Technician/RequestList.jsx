import React, { useEffect, useState } from "react";
import RequestTech from "../Technician/RequestsTech";
import axios from "../../api/axios";
const URL_A = "/assign/getAssign";
function RequestList() {
  const [assignReq, setAssignReq] = useState([]);
  const [reff, setReff] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_A, {
          user_id: localStorage.getItem("user_id"),
        });

        // console.log(localStorage.getItem("user_id"));
        // console.log(response.data);
        setAssignReq([...response.data]);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [reff]);
  return (
    <div>
      {assignReq.length === 0 ? (
        <div className="flex flex-row justify-center items-center rounded-md border border-stroke bg-white px-4   pb-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <span className="py-5">No new work order yet</span>
        </div>
      ) : (
        ""
      )}
      {assignReq.map((data, i) => (
        <RequestTech
          i={i + 1}
          request_id={data.request_id}
          date={data.assignment_date}
          room={data.room}
          floor={data.floor}
          phone={data.phone}
          description={data.description}
          key={data.assignment_id}
          block_id={data.block_id}
          title={data.title}
          requester_name={data.requester_name}
          priority={data.priority}
          status={data.status}
          setReff={setReff}
        />
      ))}
      {/* <RequestTech /> */}
      {/* <RequestTech /> */}
    </div>
  );
}

export default RequestList;
