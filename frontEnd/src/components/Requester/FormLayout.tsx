// import Breadcrumb from '../../components/Breadcrumb';
import React, { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const URL_R = "/requester/makeRequest";
const FormLayout = () => {
  const [isLoading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const { title, priority, description, image, block, floor, room } =
      e.target;
    // console.log(title);
    // if (title.value && priority.value && description.value && block.value) {
    //   return;
    // }
    // console.log(
    //   title.value,
    //   priority.value,

    //   block.value,
    //   description.value
    // );

    try {
      // Make an Axios request
      setLoading(true);
      const response = await axios.post(URL_R, {
        title: title.value,
        priority: priority.value,
        user_id: localStorage.getItem("user_id"),
        block: block.value,
        description: description.value,
        floor: floor.value,
        room: room.value,
      });
      console.log("Server response:", response.data);
      toast.success(response.data);
      setLoading(false);
      // Handle success, e.g., redirect to another page
    } catch (error) {
      console.error("Error making Axios request:", error.message);
      // Handle error, e.g., display an error message to the user
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Maintenace Request
            </h3>
          </div>
          <form onSubmit={handleSubmit} method="POST">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label
                    htmlFor="title"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="Enter your title of maintain"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="min-w-[60px] ">
                  <label
                    htmlFor="floor"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Floor
                  </label>
                  <input
                    type="text"
                    id="floor"
                    name="floor"
                    required
                    defaultValue={0}
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="min-w-[100px] ">
                  <label
                    htmlFor="room"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Room no
                  </label>
                  <input
                    type="text"
                    id="room"
                    name="room"
                    defaultValue={0}
                    required
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="proirty"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    {" "}
                    Proirity
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="priority"
                      className="relative z-20 xl:w-[100px] w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="low">Low</option>
                      <option value="meduim">Meduim</option>
                      <option value="high">High</option>
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
                <div className="">
                  <label
                    htmlFor="title"
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Block
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="block"
                      className="relative z-20 xl:w-[100px] w-full appearance-none rounded border border-stroke bg-transparent  py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="1">Block 1</option>
                      <option value="2">Block 2</option>
                      <option value="3">Block 3</option>
                      <option value="4">Block 4</option>
                    </select>
                    <span className="absolute top-[50%] right-1 z-30  -translate-y-1/2">
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
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  rows={6}
                  id="description"
                  placeholder="Type your Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
              {/* <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Image Optional
                </label>
                <input
                  type="File"
                  name="image"
                  defaultValue={"Ahmed"}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> */}
            </div>

            <div className=" mb-5 mr-4 flex flex-row justify-end gap-2">
              <button
                type="reset"
                className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
              >
                Make Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
