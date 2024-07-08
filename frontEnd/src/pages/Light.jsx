/** @format */

import { useState } from "react";
import Cards from "../components/Cards";
import Guide from "./Guide/Guide";
import { useNavigate } from "react-router-dom";

export default function Light() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(0);
  const [num, setNum] = useState(1);
  const navigator = useNavigate();
  const handleClick = (value, number) => {
    setChoice(value);
    setNum(number);
  };
  return (
    <main className="App">
      <div className=" text-xl text-primary p-5 cursor-pointer">
        <p onClick={() => navigator(-1)}>Back</p>
      </div>
      <div className=" flex w-[1240px]  gap-8 p-4 m-4 mx-auto">
        <div
          onClick={() => {
            handleClick("lockBody", 1);
            setOpen(true);
            setChoice(2);
          }}
        >
          <Cards img={"../images/lightbulb.webp"} name="Flurecent light" />
        </div>
        <div
          onClick={() => {
            handleClick("lockBody", 1);
            setOpen(true);
            setChoice(3);
          }}
        >
          <Cards img={"../images/fuse.jpg"} name="Starter" />
        </div>
      </div>
      <Guide open={open} onClose={() => setOpen(false)} choice={choice} />
    </main>

    // <div className=" p-8  ">
    //   <div className=" flex w-[1240px]  gap-8  mx-auto">
    //     <div
    //       onClick={() => {
    //         handleClick("cylinder", 2);
    //       }}>
    //       <Cards img={"../images/lightbulb.webp"} name="Key Cylinder" />
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleClick("cylinder", 3);
    //       }}>
    //       <Cards img={"../images/fuse.jpg"} name="Key Body" />
    //     </div>
    //   </div>

    //   <Guide choice={choice} num={num} />
    // </div>
  );
}
