import { formatDateRelativeToToday } from "../../api/helper";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "../../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import FormInventoryEdit from "./FormInventoryEdit";
import { IoMdCloseCircle } from "react-icons/io";
import DeleteOppup from "../Admin/DeleteOppup";

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
  const [data, setData] = useState(false);
  const [edit, setEdit] = useState();
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
    <div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className=" rounded-md">
              <Link to={image} target="_blank">
                <img
                  className="h-12.5 w-15 object-cover"
                  src={image}
                  alt="Product"
                />
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
            {edit ? (
              <IoMdCloseCircle
                onClick={() => setEdit((e) => !e)}
                className="hover:text-primary"
              />
            ) : (
              <MdEdit
                onClick={() => setEdit((e) => !e)}
                className="hover:text-primary"
              />
            )}
            {/* <MdDelete onClick={handleDelete} className="hover:text-primary" /> */}
            <DeleteOppup className="" Delts={handleDelete} />
          </div>
        </div>
      </div>
      {edit && (
        <FormInventoryEdit
          image={image}
          name={name}
          category={category}
          quantity={quantity}
          update={update}
          setFresh={setFresh}
          id={id}
          setEdit={setEdit}
        />
      )}
    </div>
  );
}

export default RowInventory;
