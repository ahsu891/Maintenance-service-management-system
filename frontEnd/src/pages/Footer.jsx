/** @format */

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative  bg-primary opacity-70 px-4 pt-20">
      {/* <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
        <img
          className="h-full object-contain"
          src="/images/logo-circle.png"
          alt=""
        />
      </div> */}
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <Link to="#" className="font-medium text-white">
          Website
        </Link>
        <Link Link to="#" className="font-medium text-white">
          Support
        </Link>
        <Link to="#" className="font-medium text-white">
          Privacy Policy
        </Link>
        <Link to="#" className="font-medium text-white">
          Terms & Conditions
        </Link>
      </nav>
      <p className="py-10 text-center text-gray">
        © 2024 Wachemo University | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
