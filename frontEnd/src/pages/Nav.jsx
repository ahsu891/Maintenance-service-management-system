/** @format */

import { Link, Outlet } from "react-router-dom";
import Navigator from "./Navigator";
import Footer from "./Footer";

export default function Nav() {
  const isLoggedIn = localStorage.getItem("roles") ? true : false;
  // alert(isLoggedIn);
  return (
    <div className=" ">
      <div className="     h-[auto] ">
        <Navigator isLoggedIn={isLoggedIn} />
        {/* <img src="../images/Logo.png  " className=" relative w-10  " />
        <header className=" flex justify-end  space-x-3 -mt-5 ">
          <Link
            className=" text-sm md:text-base  hover:text-[#3C50E0] font-bold  p-2 "
            to="login">
            LOGIN
          </Link>
          <Link
            className=" text-sm md:text-base   hover:text-[#3C50E0] p-2   font-bold"
            to="/">
            HOME
          </Link>
          <Link
            className=" text-sm md:text-base   hover:text-[#3C50E0] p-2  font-bold "
            to="maintenance">
            GUIDE
          </Link>
        </header> */}
        {/* <Guide /> */}
      </div>
      {/* <div className="  bg-primary h-[50%] bg-gradient-to-b " /> */}
      {/* <Breadcrumbs /> */}
      <Outlet />
      <Footer />
    </div>
  );
}
