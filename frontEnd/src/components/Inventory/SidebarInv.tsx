import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineContentPaste } from "react-icons/md";
// import Logo from "../../images/icon/"
import SidebarLinkGroupReq from "../Requester/SidebarLinkGroupReq.js";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  // console.log(pathname);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img
            src={
              "data:image/jpeg;base64,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"
            }
            width={80}
            alt="Logo"
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroupReq
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/inventory"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === "/inventory" &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Dashboard
                        {/* <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg> */}
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      {/* <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              eCommerce
                            </NavLink>
                          </li>
                        </ul>
                      </div> */}
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroupReq>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              {/* <li>
                <NavLink
                  to="/admin/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Preventive
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              {/* <li>
                <NavLink
                  to="/admin/usermanagement"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("usermanagement") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Technicial Management
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              {/* <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("tables") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Tables
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("tables") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Location
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/inventory/management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("management") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <span className="text-xl">
                    <MdOutlineContentPaste />
                  </span>
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inventory/request"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("request") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <span className="text-xl">
                    <MdOutlineContentPaste />
                  </span>
                  Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9763)">
                      <path
                        d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                        fill=""
                      />
                      <path
                        d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9763">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Settings
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
