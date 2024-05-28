/** @format */

import React from "react";

function Cards({ img, name }) {
  return (
    <div>
      <div className=" lg:flex lg:justify-around flex-wrap gap-4 grid grid-cols-1 mx-auto">
        <div className="card ">
          <img src={img} className=" z-0 h-[200px] w-[200px] rounded-t-lg" />
          <p className=" border-t border-t-slate-100 font-bold text-center py-2">
            {name}
          </p>
        </div>
      </div>
      {/* <img src={img} className=" rounded-lg  h-48 w-full object-cover" /> */}
    </div>
  );
}

export default Cards;
