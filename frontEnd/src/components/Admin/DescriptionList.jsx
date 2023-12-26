import React, { useState } from "react";
import TechList from "./TechList";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { dateFormating, formatDateRelativeToToday } from "../../api/helper";
const URL_A = "/assign/assingTech";
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
  tech,
  setRefresh,
  setVisible,
}) {
  const [allchecked, setAllChecked] = useState([]);
  const [list, setList] = useState(() =>
    tech.filter(
      (data) => data.specialization === "Water" && data.available === "active"
    )
  );
  async function handleAssign(e) {
    e.preventDefault();

    // console.log(e.target.type.value);
    // console.log(e.target.checked);
    console.log(allchecked);

    if (!allchecked.length) {
      return toast.error("Choose the Technician !");
    }
    try {
      // Make a GET request to the API endpoint
      const response = await axios.post(URL_A, {
        data: allchecked,
        request_id,
      });
      setRefresh((e) => !e);
      setVisible((e) => !e);
      console.log(response.data);
      toast.success(response.data);
    } catch (error) {
      console.error("Error fetching technicials:", error.message);
    }
  }
  function handleSel(e) {
    console.log(e.target.value);
    setList(
      tech.filter(
        (data) =>
          data.specialization === e.target.value && data.available === "active"
      )
    );
  }
  // console.log(list, "sssssssss");
  // console.log(tech, "sssssssss");
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
                {formatDateRelativeToToday(date)}
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
            {/*  */}
            <div className="px-4 pt-8 sm:px-0 pb-2 ">
              <h2 className="   text-md  font-semibold text-primary ">
                Assign the technician's tasks.
              </h2>
            </div>
            <form onSubmit={handleAssign}>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold  text-graydark leading-6 text-gray-900">
                  Category of request
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Type *
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="type"
                        onChange={handleSel}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="Water">Water</option>
                        <option value="General">General</option>
                        <option value="Electrical">Electrical</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold text-graydark leading-6 text-gray-900">
                  Available Techicains
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <TechList
                    list={list}
                    setAllChecked={setAllChecked}
                    allchecked={allchecked}
                  />
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                {/* <dt className="text-sm font-semibold leading-6  text-graydark"></dt> */}
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <button className="flex w-auto justify-self-end rounded bg-primary p-3 px-8 font-medium text-gray">
                    Assign
                  </button>
                </dd>
              </div>
            </form>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default DescriptionList;
<button
  type="reset"
  className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
>
  Cancel
</button>;
