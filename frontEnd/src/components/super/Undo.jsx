import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
const URLDEL = "/requester/getStatus";
const URLU = "/requester/undoStatus";

function Undo() {
  const [data, setData] = useState(0);
  useEffect(function () {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(URLDEL);
        console.log(response.data?.[0].status);
        //   toast.success(response.data);
        setData(response.data?.[0].status);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error("Error Deleting");
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  function handle() {
    // alert(status);
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URLU, {
          status: data,
        });
        console.log();
        //   toast.success(response.data);
        if (data) {
          setData(0);
        }
        if (!data) {
          setData(1);
        }
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error("Error Deleting");
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }
  console.log(data);
  return (
    <div className=" bg-white w-full h-screen">
      <div className="flex flex-row gap-2 pt-10 px-7">
        <div> Enable/Disable the Register Form :</div>
        <button
          onClick={() => handle()}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
            data ? " bg-success" : "bg-danger"
          }`}
        >
          <span
            className={`transform transition-transform duration-300 ${
              data ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 bg-white rounded-full`}
          />
        </button>
      </div>
    </div>
  );
}

export default Undo;
