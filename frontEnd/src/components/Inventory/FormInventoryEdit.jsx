import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
function images(image) {
  const parts = image.split("image/");
  const fileExtension = parts[parts.length - 1];
  return fileExtension;
}
const Url = "/inventory/update";
function FormInventoryEdit({
  image,
  name,
  category,
  quantity,
  update,
  setFresh,
  id,
  setEdit,
}) {
  const [imgDefault, setDefault] = useState();
  const [loading, setLoading] = useState();
  function handleSumit(e) {
    e.preventDefault();
    const { iname, qauntity, photo, categories } = e.target;
    // console.log("1111111", imgDefault);
    // console.log("222222222", images(image));
    setLoading(true);
    async function data() {
      try {
        const response = await axios.put(`${Url}/${id}`, {
          iname: iname.value,
          quantity: qauntity.value,
          category: categories.value,
          image: imgDefault || images(image),
        });
        console.log(response.data);
        toast.success(response.data);
        setFresh((e) => !e);
      } catch (error) {
        console.error("Error updating inventory item: ", error.message);
        // toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    }
    data();
    console.log(imgDefault);
    if (imgDefault) {
      async function dodo() {
        const formData = new FormData();
        formData.append("image", photo.files[0]);

        try {
          await axios.put(`/inventory/update-image/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setFresh((e) => !e);
          console.log("Image updated successfully");
        } catch (error) {
          console.error("Error updating image:", error);
        } finally {
          setLoading(false);
        }
      }
      dodo();
    }
    setFresh((e) => !e);
    // Get the last part of the URL which should be the file extension
    // const fileExtension = parts[parts.length - 1];
    setEdit((e) => !e);
  }
  return (
    <div className="flex flex-col gap-9 my-2 border border-gray">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Preventive Maintenace Form
          </h3>
        </div> */}
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
                  defaultValue={name}
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
                  defaultValue={quantity}
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  // onChange={handleFileChange}
                  type="file"
                  name="photo"
                  onChange={(e) => setDefault(e.target.files[0]?.name)}
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
                    defaultValue={category}
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
              disabled={loading}
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

export default FormInventoryEdit;
