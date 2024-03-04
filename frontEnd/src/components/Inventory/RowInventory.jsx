import { formatDateRelativeToToday } from "../../api/helper";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "../../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const URL_R = "/inventory/deleteSingle";
function RowInventory({
  image,
  name,
  category,
  quantity,
  update,
  setFresh,
  id,
}) {
  const [data, setData] = useState();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${URL_R}/${id}`); // Replace with your API endpoint
      // Refresh data after deletion
      toast.success(response.data);
      setFresh((e) => !e);
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(error.message);
    }
  };
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
        <div className="flex flex-row items-center gap-2 text-2xl">
          <MdEdit className="hover:text-primary" />
          <MdDelete onClick={handleDelete} className="hover:text-primary" />
        </div>
      </div>
    </div>
  );
}

export default RowInventory;
