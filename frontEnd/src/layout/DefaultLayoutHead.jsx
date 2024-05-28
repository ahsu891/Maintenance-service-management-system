import React, { useEffect, useState } from "react";

import SidebarHead from "../components/head/SidebarHead";
import HeaderHead from "../components/head/HeaderHead";
import { Outlet } from "react-router-dom";
// import io from "socket.io-client";
// const socket = io("http://localhost:8800");
const DefaultLayout = () => {
  // const [notifications, setNotifications] = useState([]);
  // useEffect(() => {
  //   socket?.emit("newUser", localStorage.getItem("user_id"));
  // }, [socket]);
  // useEffect(() => {
  //   socket.on("getNotificationTech", (data) => {
  //     setNotifications((prev) => [data, ...prev]);
  //   });
  //   return () => {
  //     socket.off("getNotificationTech");
  //   };
  //   //   };
  // }, [socket]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // console.log(notifications, "aosjdhgk;jsh");
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SidebarHead
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <HeaderHead
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
