import React from "react";
function TechList({ allchecked, setAllChecked, list }) {
  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }
  return (
    <div
      id="dropdownSearch"
      className="z-10  bg-white rounded-lg shadow w-60 dark:bg-gray-700"
    >
      {/* <div className="p-3">
        <label for="input-group-search" className="sr-only">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user"
          />
        </div>
      </div> */}
      <ul
        className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        {list?.map((data) => (
          <li key={data.technician_id}>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-11"
                type="checkbox"
                value={data.technician_id}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-11"
                className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                {data.first_name} {data.last_name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechList;
