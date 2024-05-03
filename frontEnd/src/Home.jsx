/** @format */

import React from "react";
import Cards from "../components/Cards";
// import home from "../image/windows-11-logo-colorful-background-digital-art-4k-wallpaper-uhdpaper.com-127@0@h.jpg";
// import door from "../image/road-sunset-car-city-buildings-scenery-digital-art-4k-wallpaper-uhdpaper.com-334@1@m.jpg";
// import light from "../image/sunrise-scenery-chill-coffee-bart-simpson-digital-art-4k-wallpaper-uhdpaper.com-783@0@g.jpg";
// import more from "../image/sunset-mountain-beautiful-digital-art-scenery-4k-wallpaper-uhdpaper.com-183@1@n.jpg";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className=" bg-white px-10 mt-4 overflow-auto w-[600] h-screen mb-5 rounded-md">
      <div>
        <header>
          <div>
            <h1 className="mb-4 text-blue-500 font-bold text-4xl text-left  left-0 top-0">
              Wellcome to the Repaire Guide
            </h1>
          </div>
        </header>

        <img
          src="https://media.istockphoto.com/id/1370675492/photo/fixing-door-lock-master.jpg?s=612x612&w=0&k=20&c=MdTzDR_ObGvpqFIY_B0g9-o6r1D46CkEmA68g5hdMOY="
          className=" rounded-lg  h-48 w-[1240px] object-cover"
        />
      </div>
      <div className="  lg:flex lg:justify-evenly flex-wrap gap-4 justify-center grid grid-cols-1 mx-auto">
        <Link to="door" className=" max-w-[200px]">
          <Cards
            img="https://woodshandymanservice.com/wp-content/uploads/2019/04/door-repair-installation-handyman-service.jpg"
            name="Door Repair "
          />
        </Link>
        <Link to="light" className=" max-w-[200px]">
          <Cards
            img="https://media.rs-online.com/image/upload/w_620,h_413,c_crop,c_pad,b_white,f_auto,q_auto/dpr_auto/v1581011908/F4635925-01.jpg"
            name="Light Bulb Repair"
          />
        </Link>
        <Link className=" max-w-[200px]">
          <Cards
            img="https://news.warrington.ufl.edu/wp-content/uploads/2021/01/NewsroomResizeGettyImages-1204894099.jpg"
            name=" Wall Outlet "
          />
        </Link>
      </div>
    </div>
  );
}
