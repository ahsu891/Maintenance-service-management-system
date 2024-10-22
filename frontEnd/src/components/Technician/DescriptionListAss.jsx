import React, { useEffect, useState } from "react";
// import TechList from "./TechList";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import TechListTech from "./TechListTech";
import TechListPart from "./TechListPart";
import { formatDateRelativeToToday } from "../../api/helper";
import { BiCurrentLocation } from "react-icons/bi";
import { Link } from "react-router-dom";
const URL_G = "/assign/getAssignGroup";
const URL_F = "/assign/finishAss";
function DescriptionListAss({
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
  setOn,
  setReff,
  lat,
  log,
}) {
  // console.log(list, "sssssssss");
  // console.log(tech, "sssssssss");
  const [input, setInput] = useState("");
  const [addvalue, setAddValue] = useState([]);
  const [list, setList] = useState([]);
  const [allchecked, setAllChecked] = useState([]);
  const [blat, setLat] = useState(0);
  const [blog, setLog] = useState(0);
  useEffect(function () {
    // Function to get current location coordinates and return a promise
    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        // Check if the Geolocation API is supported
        if ("geolocation" in navigator) {
          // Get the current position
          navigator.geolocation.getCurrentPosition(
            // Success callback
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Resolve the promise with the coordinates
              resolve({ latitude, longitude });
            },
            // Error callback
            function (error) {
              // Reject the promise with the error
              reject(error.message);
            }
          );
        } else {
          // Reject the promise if geolocation is not supported
          reject("Geolocation is not supported by your browser");
        }
      });
    }

    // Call the function to get current location and handle the promise
    getCurrentLocation()
      .then((coordinates) => {
        // Log or use the coordinates as needed
        setLat(coordinates.latitude);
        setLog(coordinates.longitude);
        // console.log("Latitude:", coordinates.latitude);
        // console.log("Longitude:", coordinates.longitude);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error getting location:", error);
      });
  }, []);

  function handleAdd() {
    setAddValue((e) => [...addvalue, { id: new Date(), data: input }]);
    setInput("");
  }
  function handleDeleteAdd(id) {
    setAddValue((e) => addvalue.filter((data) => data.id !== id));
  }
  function handleForm(e) {
    e.preventDefault();
    const { h, m } = e.target;

    // console.log(h.value, m.value);
    // console.log(allchecked);
    // console.log(addvalue);
    if (allchecked.length === 0) {
      return toast.error("Please Assign your Team");
    }
    if (+h.value === 0 && +m.value === 0) {
      return toast.error("Can your pleas fill the time !");
    }
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_F, {
          time: h.value * 60 * 60 + m.value * 60,

          worker: allchecked,
          request_id,
        });
        // console.log(request_id);
        // console.log(localStorage.getItem("user_id"));
        // console.log(response.data);
        toast.success(response.data);
        setReff((e) => !e);
        setOn((e) => !e);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }
  console.log(status);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_G, {
          request_id,
        });
        // console.log(request_id);
        // console.log(localStorage.getItem("user_id"));
        // console.log(response.data);
        setList([...response.data]);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [request_id]);

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
                {name || "Preventive maintenace"}
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
            {/* <div Name="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt Name="text-sm font-semibold leading-6  text-graydark">
                Categories
              </dt>
              <dd Name="mt-1 text-sm leading-6  text-graydark sm:col-span-2 sm:mt-0">
                {categories}
              </dd>
            </div> */}
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
                {phone || "not available"}
              </dd>
            </div>

            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6  text-graydark">
                Block No
              </dt>
              <dd className="mt-1 text-sm leading-6 flex flex-row items-center gap-2  text-graydark sm:col-span-2 sm:mt-0">
                {block}
                <span className=" text-primary">
                  {" "}
                  {/* 7.555442, 37.885210 */}
                  <Link
                    target="_blank"
                    to={`https://www.google.com/maps/dir/${7.555442},${37.88521}/${lat},${log}/@7.55439,37.8822889,697m/data=!3m2!1e3!4b1!4m2!4m1!3e2?entry=ttu`}
                  >
                    Go the map
                  </Link>
                </span>
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
                Work Order
              </h2>
            </div>
            <form onSubmit={handleForm}>
              {/* <div Name="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt Name="text-sm font-semibold  text-graydark leading-6 text-gray-900">
                  Category of request
                </dt>
                <dd Name="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div Name="mb-4.5">
                    <label Name="mb-2.5 block text-black dark:text-white">
                      Type *
                    </label>
                    <div Name="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="type"
                        // onChange={"handleSel"}
                        Name="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
              </div> */}
              {/* <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold text-graydark leading-6 text-gray-900">
                  Materials Utilized
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex flex-row items-center">
                    <div className="p-1">
                      <label htmlFor="input-group-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="input-group-search"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="bg-gray-50 border  border-gray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Add Matrial"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="flex w-auto justify-self-end rounded bg-primary p-2 px-5 font-medium text-gray"
                    >
                      Add
                    </button>
                  </div>
                  {addvalue.length !== 0 && (
                    <TechListTech
                      handleDeleteAdd={handleDeleteAdd}
                      addvalue={addvalue}
                    />
                  )}
                </dd>
              </div> */}
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold text-graydark leading-6 text-gray-900">
                  Partcipate Techicains
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <TechListPart
                    list={list}
                    allchecked={allchecked}
                    setAllChecked={setAllChecked}
                  />
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold text-graydark leading-6 text-gray-900">
                  Completion Time
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {/* <TechListPart /> */}
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      name="h"
                      min={0}
                      max={10}
                      className="bg-gray-50 border  border-gray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Hour"
                    />
                    <input
                      type="number"
                      name="m"
                      min={0}
                      className="bg-gray-50 border  border-gray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Minute"
                    />
                  </div>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                {/* <dt className="text-sm font-semibold leading-6  text-graydark"></dt> */}
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {status === "Completed" || (
                    <button
                      type="submit"
                      disabled={status === "Completed" ? true : false}
                      className="flex w-auto justify-self-end rounded bg-primary p-3 px-8 font-medium text-gray"
                    >
                      Complete the task
                    </button>
                  )}
                </dd>
              </div>
            </form>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default DescriptionListAss;
