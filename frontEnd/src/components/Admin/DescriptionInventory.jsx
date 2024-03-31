import { useEffect, useState } from "react";
import axios from "../../api/axios";
import TechList from "./TechList";
import MatrialList from "./MatrialList";
const Url_S = "/inventory/getSingleInventoryInfo";
function DescriptionInventory({ id, title }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(Url_S, { request_id: id });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [id]);

  return (
    <div className="">
      <div className="w-full  ">
        <div className=" mx-[auto]   px-4 py-5 card border my-5 border-gray  border-stroke bg-white px-6   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
          <div className="px-4  sm:px-0 ">
            <h2 className="text-base text-primary font-semibold leading-7">
              Request Information
            </h2>
          </div>
          <div className="mt-6 border-t border-gray">
            <dl className="divide-y divide-gray">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm  font-semibold leading-6  text-graydark">
                  Request Title
                </dt>
                <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                  {title}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm  font-semibold leading-6  text-graydark">
                  Matrial List
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <MatrialList list={data} />
                </dd>
              </div>

              {/*  */}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionInventory;
