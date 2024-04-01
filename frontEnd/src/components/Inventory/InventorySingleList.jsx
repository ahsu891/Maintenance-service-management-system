function InventorySingleList({ title, status }) {
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
              <div className="flex flex-row  gap-4 items-center">
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleUpdate("Rejected");
                    }}
                    // disabled={status === "Completed" ? false : true}
                    className=" bg-danger px-3 py-1 rounded-md text-white"
                  >
                    Reject
                  </button>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleUpdate("Accepted");
                    }}
                    // disabled={status === "Completed" ? false : true}
                    className="bg-primary px-3 py-1 rounded-md text-white"
                  >
                    Accept
                  </button>
                </div>
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
