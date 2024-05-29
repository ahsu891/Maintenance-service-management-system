import toast from "react-hot-toast";
import axios from "../../api/axios";
import DeleteOppup from "../Admin/DeleteOppup";

const Url_DR = "/inventory/deleteInventoryRequest";
const URL_R = "/inventory/UpdateInventoryRequest";
function InventorySingleList({ title, status, setReff, request_id }) {
  function handleDelete() {
    // console.log(allcheckedMa, selectedOption);
    const fetchData = async () => {
      try {
        const response = await axios.post(Url_DR, {
          request_id,
        });
        toast.success(response.data);
        setReff((e) => !e);
        // setOn((e) => !e);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.response.data);
      }
    };

    fetchData();
  }
  function handleUpdate(message) {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_R, {
          id: request_id,
          message,
        });
        // console.log(request_id);
        // console.log(localStorage.getItem("user_id"));
        // console.log(response.data);
        toast.success(response.data);
        setReff((e) => !e);

        //   setList([...response.data]);
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
        toast.error(error.response.data);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }

  return (
    <div>
      <div className="">
        <div
          // onClick={() => setOn((e) => !e)}
          className="my-5 relative border-l-4 rounded-md border-primary   transition-all  2s "
        >
          <div className=" rounded-md border  border-stroke bg-white px-6   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex md:flex-row flex-col justify-between py-4 items-center px-4 pr-7">
              <div>
                <div className="flex flex-row  gap-3 items-center py-2 ">
                  <span className=" text-boxdark">{title}</span>
                  <span>
                    {" "}
                    {status === "Assigned" && (
                      <p className=" rounded-full   w-auto block-inline  bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium   text-primary">
                        {status}
                      </p>
                    )}
                    {status === "Pending" && (
                      <p className=" rounded-full   w-auto block-inline bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium  text-warning">
                        {status}
                      </p>
                    )}
                    {status === "Accepted" && (
                      <p className=" rounded-full   w-auto block-inline bg-meta-3 bg-opacity-10 py-1 px-3 text-sm font-medium  text-meta-3">
                        {status}
                      </p>
                    )}
                    {status === "Rejected" && (
                      <p className=" rounded-full   w-auto block-inline  bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium  text-danger">
                        {status}
                      </p>
                    )}
                  </span>
                </div>
                <div className="py-1">
                  <div className="flex flex-row items-center gap-2">
                    {/* <span className="text-primary text-lg">
                    <AiOutlineMessage />
                  </span> */}
                    {/* <span className="text-sm">Assign to:</span>
                  <span className="text-sm">Ahmed</span>
                  <span className="text-sm ml-3">0970752122</span> */}
                  </div>
                </div>
              </div>
              {/* <div>
              <span>
                {" "}
                <p className=" rounded-full   w-auto block-inline bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium  text-warning">
                  {status}
                </p>
              </span>
            </div> */}
              {/* {localStorage.getItem("roles")==="Inventory"&&} */}

              <div className="flex flex-row  gap-4 items-center">
                {status !== "Accepted" &&
                  localStorage.getItem("roles") !== "Inventory" && (
                    <div>
                      {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleUpdate("Rejected");
                        handleDelete();
                      }}
                      // disabled={status === "Completed" ? false : true}
                      className=" bg-danger px-3 py-1 rounded-md text-white"
                    >
                      Deleted
                    </button> */}
                      <DeleteOppup
                        Delts={(e) => {
                          // e.stopPropagation();
                          // handleUpdate("Rejected");
                          handleDelete();
                        }}
                      />
                    </div>
                  )}

                {localStorage.getItem("roles") === "Inventory" && (
                  <div>
                    {status === "Accepted" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdate("Closed");
                        }}
                        // disabled={status === "Completed" ? false : true}
                        className="bg-primary px-3 py-1 rounded-md text-white"
                      >
                        Conform
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div>{on && <DescriptionInventory id={request_id} title={title} />}</div> */}
      </div>
    </div>
  );
}

export default InventorySingleList;
