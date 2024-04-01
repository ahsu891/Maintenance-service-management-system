import { useEffect, useState } from "react";
import InventoryRequestSingle from "./InventoryRequestSingle";
import axios from "../../api/axios";
const Url_RL = "/inventory/getReqListNotClosed";
function InventoryRequestList() {
  const [data, setData] = useState([]);
  const [reff, setReff] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(Url_RL);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [reff]);
  return (
    <div>
      {data.map((data) => (
        <InventoryRequestSingle
          key={data.id}
          request_id={data.request_id}
          title={data.title}
          status={data.status}
          setReff={setReff}
        />
      ))}
      {/* <InventoryRequestSingle /> */}
    </div>
  );
}

export default InventoryRequestList;
