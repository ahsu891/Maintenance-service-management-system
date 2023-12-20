import React, { useEffect, useState } from "react";
import RequestTech from "../Technician/RequestsTech";
import axios from "../../api/axios";
const URL_A = "/assign/getAssign";
function RequestList() {
  const [assignReq, setAssignReq] = useState([]);
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
  }, []);
  return (
    <div>
      {assignReq.map((data, i) => (
        <RequestTech
          i={i + 1}
          key={data.assignment_id}
          block_id={data.block_id}
          title={data.title}
          requester_name={data.requester_name}
          priority={data.priority}
        />
      ))}
      {/* <RequestTech /> */}
      {/* <RequestTech /> */}
    </div>
  );
}

export default RequestList;
