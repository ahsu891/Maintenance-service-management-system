import React, { useEffect, useState } from "react";

import SidebarReq from "../components/Requester/SidebarReq.js";
import HeaderReq from "../components/Requester/HeaderReq.js";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
export const socket = io("http://localhost:8800");
const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    socket?.emit("newUser", localStorage.getItem("user_id"));
  }, [socket]);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SidebarReq sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <HeaderReq
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            socket={socket}
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
