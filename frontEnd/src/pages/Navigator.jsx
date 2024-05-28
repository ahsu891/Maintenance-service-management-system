import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute  inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary   focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-center  sm:justify-between">
            <div className="flex-shrink-0 flex flew-row items-center gap-1">
              <img
                className="h-12 w-12"
                src="../images/Logo.png  "
                alt="Logo"
              />
              <span className="text-black">WCU</span>
            </div>
            <div className="hidden  sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className=" text-black-2 hover:bg-gray-700 hover:text-primary px-3 py-2 rounded-md text-md font-medium"
                >
                  Home
                </Link>
                <Link
                  to="maintenance"
                  className=" text-black-2 hover:bg-gray-700 hover:text-primary px-3 py-2 rounded-md text-md font-medium"
                >
                  Guide
                </Link>
                {isLoggedIn ? (
                  <Link
                    to={`/${localStorage.getItem("roles").toLowerCase()}`}
                    className=" text-black-2 hover:bg-gray-700 hover:text-primary px-3 py-2 rounded-md text-md font-medium"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className=" text-black-2 hover:bg-gray-700 hover:text-primary px-3 py-2 rounded-md text-md font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div>
          <div className="sm:hidden   bg-stroke" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className=" text-black-2 hover:bg-gray-700 hover:text-primary block px-3 py-2 rounded-md text-md font-medium"
              >
                Home
              </Link>
              <Link
                to="maintenance"
                className=" text-black-2 hover:bg-gray-700 hover:text-primary block px-3 py-2 rounded-md text-md font-medium"
              >
                Guide
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className=" text-black-2 hover:bg-gray-700 hover:text-primary block px-3 py-2 rounded-md text-md font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className=" text-black-2 hover:bg-gray-700 hover:text-primary block px-3 py-2 rounded-md text-md font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
