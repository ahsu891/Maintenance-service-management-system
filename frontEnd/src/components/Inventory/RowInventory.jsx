import { formatDateRelativeToToday } from "../../api/helper";
import { Link } from "react-router-dom";
function RowInventory({ image, name, category, quantity, update }) {
  return (
    <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-3 flex items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-12.5 w-15 rounded-md">
            <Link to={image} target="_blank">
              <img src={image} alt="Product" />
            </Link>
          </div>
          <p className="text-sm text-black dark:text-white">{name}</p>
        </div>
      </div>
      <div className="col-span-2 hidden items-center sm:flex">
        <p className="text-sm text-black dark:text-white">{category}</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="text-sm text-black dark:text-white">
          {formatDateRelativeToToday(update)}
        </p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="text-sm text-black dark:text-white">{quantity}</p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="text-sm text-meta-3">$125</p>
      </div>
    </div>
  );
}

export default RowInventory;
