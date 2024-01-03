import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
const URL_P = "/prevent/maintenance";
function FormPreventive({ setRefreshing, setAdd }) {
  const [isLoading, setLoading] = useState(false);
  async function handleSumit(e) {
    e.preventDefault();
    const {
      title,
      date,
      floor,
      rep,
      intv,
      sin,
      room,
      categories,
      priority,
      block,
      description,
    } = e.target;

    console.log(floor.value);

    try {
      // Make an Axios request
      setLoading(true);
      const response = await axios.post(URL_P, {
        title: title.value,
        description: description.value,
        start_date: date.value,
        repetition: rep.value,
        floor: floor.value,
        room: room.value,
        categories: categories.value,
        priority: priority.value,
        block_no: block.value,
        schedule_interval: sin.value,
        interval_unit: intv.value,
      });
      // console.log("Server response:", response.data);
      toast.success(response.data);
      // toast.success("response.data");

      setLoading(false);
      setRefreshing((e) => !e);
      setAdd((e) => !e);
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
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Preventive Maintenace Form
          </h3>
        </div>
        <form onSubmit={handleSumit} method="POST">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row  flex-wrap">
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
              <div className="w-full xl:w-1/2">
                <label
                  htmlFor="title"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Start date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="min-w-[60px] ">
                <label
                  htmlFor="floor"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Floor
                </label>
                <input
                  type="number"
                  id="floor"
                  name="floor"
                  required
                  defaultValue={0}
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="min-w-[60px] ">
                <label
                  htmlFor="ssdd"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Repetition
                </label>
                <input
                  type="number"
                  id="ssdd"
                  name="rep"
                  required
                  defaultValue={0}
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="min-w-[60px] ">
                <label
                  htmlFor="sin"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Schedule Interval:
                </label>
                <input
                  type="number"
                  id="sin"
                  name="sin"
                  required
                  defaultValue={0}
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Interval Unit
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    name="intv"
                    className="relative z-20 xl:w-[110px] w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
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
              <div className="min-w-[100px] ">
                <label
                  htmlFor="room"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Room no
                </label>
                <input
                  type="number"
                  id="room"
                  name="room"
                  defaultValue={0}
                  required
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Type
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    name="categories"
                    className="relative z-20 xl:w-[130px] w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="General">General</option>
                    <option value="Water">Water</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Other">Other</option>
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
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
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
              Make Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPreventive;
