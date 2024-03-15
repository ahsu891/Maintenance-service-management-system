// import Breadcrumb from '../../components/Breadcrumb';

import TechList from "../Admin/TechList";
import ListItem from "./ListItem";

function FormLayout() {
  return (
    <>
      {/* <Breadcrumb pageName="FormLayout" /> */}

      <div>
        <div>
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Request Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                  <dt className="mb-2.5 block text-black dark:text-white ">
                    Techicain Name
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                            // value={input}
                            // onChange={(e) => setInput(e.target.value)}
                            className="bg-gray-50 border  border-gray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add Matrial"
                          />
                        </div>
                      </div>
                      {/* <button
                        type="button"
                        // onClick={handleAdd}
                        className="flex w-auto justify-self-end rounded bg-primary p-2 px-5 font-medium text-gray"
                      >
                        Add
                      </button> */}
                    </div>
                    <ListItem list={[]} setAllChecked={[]} allchecked={[]} />
                  </dd>
                </div>
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="mb-2.5 block text-black dark:text-white ">
                    Maintenance Request
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* <TechListPart /> */}
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
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
                  </dd>
                </div>

                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                  <dt className="mb-2.5 block text-black dark:text-white ">
                    Matrial List
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                            // value={input}
                            // onChange={(e) => setInput(e.target.value)}
                            className="bg-gray-50 border  border-gray text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add Matrial"
                          />
                        </div>
                      </div>
                      {/* <button
                        type="button"
                        // onClick={handleAdd}
                        className="flex w-auto justify-self-end rounded bg-primary p-2 px-5 font-medium text-gray"
                      >
                        Add
                      </button> */}
                    </div>
                    <ListItem list={[]} setAllChecked={[]} allchecked={[]} />
                  </dd>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormLayout;
