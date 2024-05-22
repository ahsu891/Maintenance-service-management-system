import { useEffect, useState } from "react";
import InventoryRequestSingle from "./InventoryRequestSingle";
import axios from "../../api/axios";
import Spiner from "../Spiner";
const Url_RL = "/inventory/getReqListNotClosed";
function InventoryRequestList() {
  const [data, setData] = useState([]);
  const [reff, setReff] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        setLoading(true);
        const response = await axios.get(Url_RL);
        setData(response.data);
        console.log(response.data);
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
    <Spiner />;
  }
  return (
    <div>
      {data.length === 0 ? (
        <div className="flex flex-row justify-center items-center rounded-md border border-stroke bg-white px-4   pb-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <span className="py-5">No data to display.</span>
        </div>
      ) : (
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
        </div>
      )}

      {/* <InventoryRequestSingle /> */}
    </div>
  );
}

export default InventoryRequestList;
