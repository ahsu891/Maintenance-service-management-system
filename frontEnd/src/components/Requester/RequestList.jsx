import { useEffect, useState } from "react";
import axios from "../../api/axios";
import RequestSingle from "./RequestSingle";
const URL_R = "/requester/getSingleInfo";
function RequestList({ reff, setReff }) {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_R, {
          requester_id: localStorage.getItem("user_id"),
        });
        // console.log(request_id);
        // console.log(localStorage.getItem("user_id"));
        console.log(response.data);
        setRequest([...response.data]);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [reff]);
  return (
    <div>
      {request?.map((data) => {
        return (
          <RequestSingle
            status={data.status}
            title={data.title}
            key={data.request_id}
            request_id={data.request_id}
            setReff={setReff}
          />
        );
      })}
    </div>
  );
}

export default RequestList;
