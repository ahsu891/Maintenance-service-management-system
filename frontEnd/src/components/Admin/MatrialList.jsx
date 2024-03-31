function MatrialList({ list }) {
  //   console.log(list);
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
        className="h-48 px-1 pb-2 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        {list?.map((data, i) => (
          <li key={data.id}>
            <div className="flex items-center pt-3 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <label
                htmlFor="checkbox-item-11"
                className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                <div className=" flex flex-row items-center justify-between">
                  <span>
                    {" "}
                    {i + 1}. {data.item_name}{" "}
                  </span>
                  <span className="text-primary"> {data.quantity_used}</span>
                </div>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatrialList;
