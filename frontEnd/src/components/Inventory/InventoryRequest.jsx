import { useEffect, useState } from "react";
import FormLayout from "../Inventory/FormLayout";

import axios from "../../api/axios";
import InventorySingleList from "./InventorySingleList";
import S from "../Spiner";
const Url_l = "/inventory/getReqListNotClosed";
function InventoryRequest() {
  const [on, setOn] = useState(false);
  const [data, setDate] = useState([]);
  const [reff, setReff] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(Url_l);
        setDate(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Clean up function to cancel the request if the component unmounts or the effect re-runs
    return () => {
      // Cancel the request (if using axios cancellation)
    };
  }, [reff]);

  if (isLoading) {
    return <S />;
  }
  return (
    <div>
      {data.length === 0 && (
        <div className="flex flex-row items-center p-2 justify-center bg-white">
          <span>No data yet!</span>
        </div>
      )}
      <div>
        {data?.map((data) => (
          <InventorySingleList
            title={data.title}
            key={data.id}
            status={data.status}
            setReff={setReff}
            request_id={data.request_id}
          />
        ))}
      </div>
      {localStorage.getItem("roles") === "Technician" && (
        <>
          <div className="flex flex-row justify-end">
            <button
              // disabled={isLoading
              onClick={() => setOn((e) => !e)}
              className="flex w-auto justify-self-end rounded my-2 bg-primary px-3 py-2 font-medium text-gray"
            >
              + Add
            </button>
          </div>
          {on && <FormLayout setOn={setOn} setReff={setReff} />}
        </>
      )}
    </div>
  );
}

export default InventoryRequest;
