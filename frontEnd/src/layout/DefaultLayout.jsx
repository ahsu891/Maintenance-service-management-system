import React, { useEffect, useState } from "react";

import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import { Outlet } from "react-router-dom";
import axios from "../api/axios";
import io from "socket.io-client";
import toast from "react-hot-toast";
import Spiner from "../components/Spiner";
const URL_R = "/prevent/checkPrevent";
export const socket = io("http://localhost:8800");
const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.post(URL_R);
        // setRequest([...response.data]);
        // toast.success(response.data);
        console.log(response.data);
        if (response.data === "Successfully") {
          socket.emit("sendNotification", {
            id: new Date(),
            user_id: localStorage.getItem("user_id"),
            type: "preventive Maintenace",
            title: "The maintenace schedule",
          });
        }
      } catch (error) {
        console.error("Error fetching technicials:", error.message);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
    return () => {
      socket.off("sendNotification");
    };
  }, []);

  // useEffect(() => {
  //   console.log("Effect hook called");
  //   // Listen for incoming messages
  //   socket.on("chat message", (msg) => {
  //     console.log("Message received:", msg);
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   // Clean up function
  //   return () => {
  //     socket.off("chat message");
  //   };
  // }, []);
  useEffect(() => {
    socket?.emit("newUser", localStorage.getItem("user_id"));
  }, [socket]);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
    return () => {
      socket.off("getNotification");
    };
    //   };
  }, [socket]);
  // const sendMessage = () => {
  //   if (input.trim() !== "") {
  //     socket.emit("chat message", input);
  //     setInput("");
  //   }
  // };
  // console.log(notifications);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      {/* <Spiner /> */}
      {}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            socket={socket}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            notifications={notifications}
            setNotifications={setNotifications}
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
