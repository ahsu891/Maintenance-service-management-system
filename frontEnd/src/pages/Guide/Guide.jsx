/** @format */

import { useState } from "react";
import { Info } from "../Info";
// import { choice } from "../Door";
import Details from "./Details";
export default function Guide({ choice, num, open, onClose, children }) {
  // const [choices, setChoices] = useState(choice);
  const [tab, setTab] = useState(false);
  const [tab2, setTab2] = useState("");
  const handeltabClick = (tab) => {
    tab ? setTab(true) : setTab(false);
  };

  return (
    <>
      {/**/}
      <div
        onClick={onClose}
        className={`
        fixed inset-0 flex  items-center  transition-colors
        ${open ? "visible bg-black/50" : "invisible"}
      `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-white rounded-xl mx-auto shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          {/**/}
          <div
            className={`rounded-tl-md w-[70px] border-r  cursor-pointer inline-block ${
              tab ? "bg-white" : "bg-gray-200"
            } `}
            onClick={() => handeltabClick(true)}
          >
            <p className=" text-center">Steps </p>
          </div>
          <div
            className={`rounded-tr-md w-[70px] inline-block  cursor-pointer ${
              !tab ? "bg-white" : "bg-gray-200"
            } `}
            onClick={() => handeltabClick(false)}
          >
            <p className=" text-center">Video</p>
          </div>
          <div className="  w-full shadow-md shadow-md-right-bottom mb-[200px]">
            <div className="  bg-white   rounded-tr-lg rounded-b-lg p-4 ">
              <div className=" h-[300px] ">
                {tab ? (
                  Info[choice].data.map((steps) => (
                    <ul className=" list-disc pl-4">
                      <li>{steps}</li>
                    </ul>
                  ))
                ) : (
                  <iframe
                    width="500px"
                    height="500px"
                    src={Info[choice].video}
                  ></iframe>
                )}
              </div>
            </div>
          </div>
          {/**/}
        </div>
      </div>
      {/**/}
    </>
  );
}
