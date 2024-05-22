// import ProductOne from '../images/product/product-01.png';
// import ProductTwo from '../images/product/product-02.png';
// import ProductThree from '../images/product/product-03.png';
// import ProductFour from '../images/product/product-04.png';
import { useEffect, useState } from "react";
import FormInventory from "../Inventory/FormInventory";
import axios from "../../api/axios";
import RowInventory from "./RowInventory";
import S from "../Spiner";
import Pagination from "../Admin/Pagination";
const URL_GI = "inventory/getInventory";
const TableTwo = () => {
  const [data, setData] = useState([]);
  const [on, setOn] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataa = data;
  const rowsPerPage = 5;
  const totalPages = Math.ceil(dataa.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = dataa.slice(indexOfFirstRow, indexOfLastRow);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL_GI); // Replace with your API endpoint
        setData(response.data);
        console.log(response.data);
        // console.log(resonse.)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fresh]);

  if (isLoading) {
    return <S />;
  }

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            List Item
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="sm:col-span-3 col-span-2 flex items-center">
            <p className="font-medium">Item Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Updated</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Quanitity</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>
        {currentData.map((data) => (
          <RowInventory
            key={data.id}
            id={data.id}
            setFresh={setFresh}
            image={data.image}
            category={data.item_category}
            quantity={data.quantity}
            update={data.last_update}
            name={data.item_name}
          />
        ))}
      </div>
      <div>
        <div className="display flex  justify-end my-4">
          <button
            // disabled={isLoading}
            onClick={() => setOn((prevOn) => !prevOn)} // Corrected onClick handler
            className="flex w-auto justify-self-end rounded bg-primary px-4 py-2.5 font-medium text-gray"
          >
            {on ? "Cancel" : "Add"}
          </button>
        </div>
        <div className=" my-2 flex flex-row  justify-end">
          {/* {on && <FormLayout toggle={() => handleOn()} />} */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        {on && (
          <div className="my-8">
            <FormInventory setFresh={setFresh} setOn={setOn} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableTwo;
