import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const remainingSeconds = timeInSeconds % 60;

  return `${hours > 0 ? ` ${hours < 10 ? "0" : ""}${hours}:` : ""}${
    minutes > 0 ? `${minutes < 10 ? "0" : ""}${minutes}:` : ""
  }${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
function WorkOrder() {
  const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds + 1);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div>
      {/* <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mb-4">Timer</h1>
        <p className="text-2xl">{seconds} seconds</p>
        <p className="text-2xl">{formatTime(seconds)}</p>
      </div> */}
      <Outlet />
    </div>
  );
}

export default WorkOrder;
