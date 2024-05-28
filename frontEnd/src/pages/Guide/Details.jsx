import React, { useState } from "react";
import { Info } from "../Info";

function details({ tab }) {
  // const [choice, setChoice] = useState("");
  return (
    <div className=" z-50">
      <div className=" ">
        {Info[0].map((info) => (
          <iframe src={info.video}></iframe>
        ))}
      </div>
    </div>
  );
}

export default details;
