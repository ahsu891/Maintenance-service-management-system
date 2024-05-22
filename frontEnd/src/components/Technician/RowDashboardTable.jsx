import { formatDateRelativeToToday } from "../../api/helper";

function RowDashboardTable({ category, status, block, priority, title, date }) {
  return (
    <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        {/* <div className="flex-shrink-0">
            <img src={"BrandOne"} alt="Brand" />
          </div> */}
        <p className=" text-black dark:text-white ">{title}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="hidden  text-black dark:text-white sm:block">
          {category}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{block}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">
          {formatDateRelativeToToday(date)}
        </p>
      </div>

      {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">{status}</p>
      </div> */}
      {status === "Closed" && (
        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-meta-3">Completed</p>
        </div>
      )}
      {(status !== "Closed" || status === "Reject") && (
        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-meta-3">{status}</p>
        </div>
      )}
      {status === "Reject" && (
        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-meta-7">{status}</p>
        </div>
      )}
    </div>
  );
}

export default RowDashboardTable;
