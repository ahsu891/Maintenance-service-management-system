import { formatDateRelativeToToday } from "../../api/helper";
import React from "react";
import FormPreventiveEdit from "./FormPreventiveEdit";
function RowRequestPrevent({
  block_id,
  floor,
  phone,
  date,
  request_id,
  requester_id,
  room,
  status,
  description,
  i,
  title,
  categories,
  name,
  priority,
  id,
  tech,
  rep,
  sin,
  inv,
  setRefreshing,
}) {
  return (
    <div className="mb-4">
      <div
        // onClick={() => setVisible((c) => !c)}
        className="grid grid-cols-[30px,1.5fr,1fr,1fr,0.7fr]    gap-8"
      >
        <div className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11 flex flex-row items-center">
          <h5 className="font-medium text-black dark:text-white">{i}</h5>
        </div>
        <div className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 flex flex-row items-center">
          <h5 className="font-medium text-black dark:text-white  ">{title}</h5>
        </div>
        <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex flex-row items-center">
          <p className="text-black dark:text-white">{categories}</p>
        </div>
        <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex flex-row items-center">
          <p className="text-black dark:text-white">
            {formatDateRelativeToToday(date)}
          </p>
        </div>
        <div className="border-b border-[#eee]  ir py-5 px-4 dark:border-strokedark flex flex-row items-center">
          <div className=" flex flex-row items-center gap-1">
            {}
            <p className="  rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary flex flex-row items-center">
              {priority}
            </p>
          </div>
        </div>
      </div>
      <div className=" my-3">
        <FormPreventiveEdit
          title={title}
          date={date}
          floor={floor}
          rep={rep}
          sin={sin}
          inv={inv}
          room={room}
          categories={categories}
          priority={priority}
          block={block_id}
          description={description}
          id={id}
          setRefreshing={setRefreshing}
        />
      </div>
    </div>
  );
}

export default RowRequestPrevent;
