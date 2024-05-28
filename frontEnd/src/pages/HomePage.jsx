/** @format */

import React from "react";

function HomePage() {
  return (
    <div className={`  mt-10  h-screen bg-[${"../images/background"}] `}>
      <div>
        <div>
          <img className=" mx-auto " src={"../images/Logo.png"} />
        </div>
        <div>
          <h1 className=" text-slate-400 font-bold text-center text-2xl ">
            Welcome to the Wachemo University's
            <br /> Maintenance Service Managment System
          </h1>
        </div>
        <div className=" flex h-7 justify-around mt-10 inset-0 ">
          <div className=" h-56 w-[500px] p-4 font-bold text-center text-slate-400 ">
            {" "}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio, quae error aliquam nemo nihil autem corrupti nam
              ducimus, dignissimos recusandae pariatur suscipit eum ipsum,
              provident soluta illum laudantium cupiditate vel.
            </p>{" "}
          </div>
          <div className=" h-56 w-[500px] p-4 font-bold text-center text-slate-400 ">
            {" "}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio, quae error aliquam nemo nihil autem corrupti nam
              ducimus, dignissimos recusandae pariatur suscipit eum ipsum,
              provident soluta illum laudantium cupiditate vel.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
