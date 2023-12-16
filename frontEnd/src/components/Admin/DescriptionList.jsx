import React from "react";
import TechList from "./TechList";
function DescriptionList({
  block,
  floor,
  phone,
  date,
  request_id,
  requester_id,
  room,
  status,
  description,

  title,
  categories,
  name,
  priority,
}) {
  return (
    <div className="w-full ">
      <div className=" mx-[auto]  max-w-[800px]  px-4 py-5 card border my-5 border-gray ">
        <div className="px-4  sm:px-0 ">
          <h2 className="text-base text-primary font-semibold leading-7">
            Request Information
          </h2>
        </div>
        <div className="mt-6 border-t border-gray">
          <dl className="divide-y divide-gray">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm  font-semibold leading-6  text-graydark">
                Full Name
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {name}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Title
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {title}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Categories
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {categories}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Date
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {date}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Phone
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {phone}
              </dd>
            </div>

            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Block No
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {block}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Floor No
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {floor}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Room No
              </dt>
              <dd className="mt-1 text-sm leading-6 text-graydark sm:col-span-2 sm:mt-0">
                {room}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Description
              </dt>
              <dd className="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {description}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <TechList />
              </dd>
              <TechList />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default DescriptionList;
