import { useState } from "react";
import DescriptionListAss from "./DescriptionListAss";
import DescriptionList from "./DescriptionListAss";

function Requests({
  block_id,
  room,
  request_id,
  title,
  floor,
  phone,
  description,
  requester_name,
  priority,
  i,
  date,
  status,
  setReff,
  lat,
  log,
}) {
  const [on, setOn] = useState(false);
  return (
    <>
      <div
        onClick={() => setOn((e) => !e)}
        className="my-5 relative border-l-4 rounded-md border-primary hover:-translate-y-2   transition-all  2s "
      >
        <div className=" rounded-md border border-stroke bg-white px-4   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <span className=" absolute top-1 right-3 text-primary">{i}#</span>
          <div className="flex gap-5   py-3 px-1 flex-row items-center justify-between">
            <div className=" max-w-7/10 ">
              <p className="  text-boxdark py-1  text-lg">{title}</p>
              <div className="flex flex-row text-sm gap-5 items-center">
                <div className="py-2">
                  <span>Requested by : </span>
                  <span className="text-boxdark">{requester_name}</span>
                </div>
                <span className="text-boxdark">
                  Block-<span className="text-primary">{block_id}</span>
                  {/* <span>
                    <BiCurrentLocation />
                  </span> */}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-2 ">
              {status === "Completed" && (
                <p className=" rounded-full  bg-meta-3 bg-opacity-10 py-1 px-3 text-sm font-medium  text-meta-3">
                  {status}
                </p>
              )}
              {/* <div className="text-primary">{priority}</div> */}
              {/* <button className="outline outline-1 outline-primary px-3 py-1 rounded-md text-primary">
                Reject
              </button>
              <button className="bg-primary px-3 py-1 rounded-md text-white">
                Accept
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {on && (
        <div className="rounded-md border border-stroke bg-white px-4   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <DescriptionListAss
            title={title}
            floor={floor}
            date={date}
            room={room}
            phone={phone}
            status={status}
            name={requester_name}
            description={description}
            requester_name={requester_name}
            priority={priority}
            block={block_id}
            request_id={request_id}
            setOn={setOn}
            setReff={setReff}
            lat={lat}
            log={log}
          />
        </div>
      )}
    </>
  );
}

export default Requests;
