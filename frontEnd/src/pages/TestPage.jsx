/** @format */

import React from "react";

function TestPage() {
  return (
    <div>
      <div className="relative w-full h-screen  ">
        <img
          className="absolute w-full h-full object-cover inset-0 mix-blend-overlay"
          src="../images/background.jpg"
          alt=""
        />
        <div className="animate-slideInFromBottom duration-200 p-6 bg-white/0 text-black content-center ">
          <div className=" mx-auto  sm:w-[70%] mt-5  ">
            <div className=" my-4">
              <h1 className=" font-bold text-primary text-center text-2xl ">
                Welcome to Wachemo University's
                <br /> Maintenance Service Managment System
              </h1>
            </div>
            <div className=" my-4 ">
              <img
                src="../images/Logo.png"
                className=" mx-auto relative "
                alt=""
              />
            </div>
            <p className="mt-2 font-bold text-primary text-center  ">
              Let your light shine on the society
            </p>
          </div>
        </div>
      </div>

      {/* <div className=" p-6 ">
        <h1 className=" font-bold ">ABOUT</h1>
        <div className=" grid md:grid-cols-3 gap-9">
          <div>
            <h1> Title </h1>
            <div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aperiam recusandae natus rem itaque animi, ipsam totam, sapiente
                reiciendis, debitis nemo possimus temporibus. Incidunt,
                recusandae qui? Officia illum esse sit nesciunt?
              </p>
            </div>
          </div>
          <img
            src="../images/sunrise-scenery-chill-coffee-bart-simpson-digital-art-4k-wallpaper-uhdpaper.com-783@0@g.jpg"
            className=" w-[200px] h-[100px] md:col-span-2 "
          />
        </div>
      </div> */}

      <div className="w-full bg-white py-16 px-4" id="about">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <img
            className="w-[350px] mx-auto my-4"
            src="../images/tech.jpg"
            alt="/"
          />
          <div className="flex flex-col justify-center">
            {/* <p className="text-[#00df9a] font-bold ">
              DATA ANALYTICS DASHBOARD
            </p> */}
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-primary">
              Wachemo University
            </h1>
            <p>
              At Wachemo University, our mission is to enhance campus operations
              through an efficient and reliable maintenance service management
              system. We are dedicated to ensuring a well-maintained and
              smoothly functioning campus environment for all students, faculty,
              and staff.
            </p>
            {/* <button className="bg-black text-[#00df9a] hover:shadow-2xl w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
              Get Started
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
