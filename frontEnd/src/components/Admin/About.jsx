import { Outlet } from "react-router-dom";
import { createPortal } from "react-dom";
import React from "react";
import Gps from "./Gps";
function About() {
  return createPortal(
    <div className=" absolute fixed top-0 left-0 w-full h-screen  bg-[#0000004c] backdrop-filter  backdrop-blur-1 z-50 transition-all duration-500">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-lg shadow-lg p-16 transition-all duration-500">
        {/* Your content goes here */}
        <Gps />
      </div>
    </div>,
    document.body
  );
}

export default About;
