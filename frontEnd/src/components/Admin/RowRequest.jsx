import React, { useState } from "react";
import DescriptionList from "./DescriptionList";
function RowRequest({
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
  tech,
  setRefresh,
}) {
  const [visible, setVisible] = useState(false);

  // console.log(priority);
  return (
    <>
      <div
        onClick={() => setVisible((c) => !c)}
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
          <p className="text-black dark:text-white">{name}</p>
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
      {visible && (
        <DescriptionList
          block={block_id}
          floor={floor}
          phone={phone}
          date={date}
          request_id={request_id}
          requester_id={requester_id}
          room={room}
          status={status}
          description={description}
          title={title}
          categories={categories}
          name={name}
          priority={priority}
          tech={tech}
          setRefresh={setRefresh}
          setVisible={setVisible}
        />
      )}
    </>
  );
}

export default RowRequest;
