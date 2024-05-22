import { useEffect, useState } from "react";
import axios from "../../api/axios";
import RequestSingle from "./RequestSingle";
import Spiner from "../Spiner";
const URL_R = "/requester/getSingleInfo";
function RequestList({ reff, setReff }) {
  const [request, setRequest] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [reff]);
  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div>
      {/* <div className="text-2xl text-primary font-semibold">Make Request</div> */}
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
