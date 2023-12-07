import React from "react";
function SearchBar() {
  return (
    <div className="py-2 flex flex-row justify-end items-center">
      <div className="hidden sm:block">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative">
            <button className="absolute top-1/2 left-0 -translate-y-1/2">
              <svg
                className="fill-body pl-0.5 hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type to search..."
              className="max-w-[180px] p-2 bg-transparent pr-4 pl-9 focus:outline-none border  border-gray"
            />
          </div>
        </form>
      </div>
      <label
        htmlFor="sort"
        className=" w-fit  text-xs md:text-base text-medium-purple flex flex-row mx-2 items-center justify-center  "
      >
        <span className="text-md md:text-sm">Sort by </span>
        <select
          name="sort"
          id="sort"
          className=" ml-2 rounded-md border-2  border-gray p-2 bg-transparent text-medium-purple pr-12 "
        >
          <option value="a">Latest</option>
          <option value="b">Oldest</option>
          <option value="c">Alphabet</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
