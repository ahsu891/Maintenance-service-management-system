/** @format */

import React from "react";
import Cards from "../components/Cards";
// import home from "../image/windows-11-logo-colorful-background-digital-art-4k-wallpaper-uhdpaper.com-127@0@h.jpg";
// import door from "../image/road-sunset-car-city-buildings-scenery-digital-art-4k-wallpaper-uhdpaper.com-334@1@m.jpg";
// import light from "../image/sunrise-scenery-chill-coffee-bart-simpson-digital-art-4k-wallpaper-uhdpaper.com-783@0@g.jpg";
// import more from "../image/sunset-mountain-beautiful-digital-art-scenery-4k-wallpaper-uhdpaper.com-183@1@n.jpg";
import { Link, Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className=" bg-gray px-10 h-screen  overflow-auto w-[600] -z-50  mb-5 rounded-md">
      <div>
        <header>
          <div className=" my-20">
            <h1 className="my-4 text-primary font-medium sm:text-4xl text-3xl text-center  left-0 top-0 ">
              Wellcome to the Repaire Guide
            </h1>
          </div>
        </header>

        {/* <img
          src={"../images/Logo.png"}
          className=" object-cover mx-auto my-8  object-cover"
        />
        <h1 className=" text-slate-400 font-bold text-center my-8 text-2xl ">
          Welcome to the Wachemo University's
          <br /> Maintenance Service Managment System
        </h1> */}
      </div>
      <div className="  lg:flex lg:justify-evenly flex-wrap gap-4 justify-center  ">
        <Link to="door" className=" max-w-[200px]">
          <Cards img={"../images/door.jfif"} name="Door Repair " />
        </Link>
        <Link to="light" className=" max-w-[200px]">
          <Cards img={"../images/lightbulb.webp"} name="Light Bulb Repair" />
        </Link>
        <Link className=" max-w-[200px]">
          <Cards img={"../images/outlet.jpg"} name=" Wall Outlet " />
        </Link>
      </div>
    </div>
  );
}
