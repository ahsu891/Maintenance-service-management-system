import { Outlet } from "react-router-dom";
import { createPortal } from "react-dom";
import React from "react";
// import Gps from "./Gps";
import CardOne from "../Admin/CardOne";
import CardTwo from "../Admin/CardTwo";
import CardThree from "../Admin/CardThree";
import CardFouor from "../Admin/CardFour";
function About() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFouor />
      </div>
    </div>
  );
}

export default About;
