import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
const URL_U = "/inventory/upload";
function FormPreventive({ setFresh, setOn }) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile((e) => event.target.files[0]);
  };
  async function handleSumit(e) {
    e.preventDefault();
    setLoading(true);
    const { iname, qauntity, photo, categories } = e.target;

    // console.log(iname.value);
    // console.log(qauntity.value);
    // console.log(photo.value);
    // console.log(categories.value);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("quantity", qauntity.value);
    formData.append("categories", categories.value);
    formData.append("iname", iname.value);
    // console.log(formData);

    try {
      const response = await axios.post(URL_U, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFresh((r) => !r);
      setOn((r) => !r);
      toast.success(response.data);
      // setUploadMessage(response.data.message);
    } catch (error) {
      console.log("Error uploading file:", error);
      toast.error(error.response.data);
      // setUploadMessage('An error occurred while uploading the file.');
    } finally {
      setLoading(false);
    }
    // try {
    //   // Make an Axios request
    //   setLoading(true);
    //   const response = await axios.post(URL_P, {
    //     title: title.value,
    //     description: description.value,
    //     start_date: date.value,
    //     repetition: rep.value,
    //     floor: floor.value,
    //     room: room.value,
    //     categories: categories.value,
    //     priority: priority.value,
    //     block_no: block.value,
    //     schedule_interval: sin.value,
    //     interval_unit: intv.value,
    //   });
    //   // console.log("Server response:", response.data);
    //   toast.success(response.data);
    //   // toast.success("response.data");

    //   setLoading(false);
    //   setRefreshing((e) => !e);
    //   setAdd((e) => !e);
    //   // Handle success, e.g., redirect to another page
    // } catch (error) {
    //   console.error("Error making Axios request:", error.message);
    //   // Handle error, e.g., display an error message to the user
    //   toast.error(error.message);
    // } finally {
    //   setLoading(false);
    // }
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
                  htmlFor="name"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="iname"
                  required
                  placeholder="Enter the name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="min-w-[60px] ">
                <label
                  htmlFor="qauntity"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Qauntity
                </label>
                <input
                  type="number"
                  id="qauntity"
                  name="quantity"
                  required
                  min={1}
                  defaultValue={0}
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="photo"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
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
            </div>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPreventive;

{
  /* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
  <h3 className="font-medium text-black dark:text-white">
    File upload
  </h3>
</div>
<div className="flex flex-col gap-5.5 p-6.5">
  <div>
    <label className="mb-3 block text-black dark:text-white">
      Attach file
    </label>
    <input
      type="file"
      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
    />
  </div>

  <div>
    <label className="mb-3 block text-black dark:text-white">
      Attach file
    </label>
    <input
      type="file"
      className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
    />
  </div>
</div>
</div>
</div> */
}
