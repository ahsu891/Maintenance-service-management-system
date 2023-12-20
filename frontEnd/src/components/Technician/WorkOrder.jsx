import React from "react";

function WorkOrder() {
  return (
    <div className="my-5 border-l-4 rounded-md border-primary hover:-translate-y-2   transition-all  2s ">
      <div className=" rounded-md border border-stroke bg-white px-4   pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex gap-5   py-3 px-1 flex-row items-center justify-between">
          <div className=" max-w-7/10 ">
            <p className="  text-boxdark py-1  text-lg">
              The door is open please fixhhldsknnnnnnnnnnnnnnnnn lo
            </p>
            <div className="flex flex-row text-sm gap-5 items-center">
              <div className="py-2">
                <span>Requested by:</span>
                <span className="text-boxdark">Ahmed Sujfiyan</span>
              </div>
              <span className="text-boxdark">
                Block-<span className="text-primary">14</span>
              </span>
            </div>
          </div>
          <div>
            <div className="text-primary">Meduim</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrder;
