/** @format */

import { useState } from "react";

import Cards from "../components/Cards";
// import { Link } from "react-router-dom";
// import Guide from "./Guide/Guide";

// import Trash from "./icons/Trash";
import Modal from "./Guide/Modal";
import Guide from "./Guide/Guide";
import { useNavigate } from "react-router-dom";

function Walloutlet() {
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const [choice, setChoice] = useState(0);
  const [num, setNum] = useState(1);

  const handleClick = (value, number) => {
    setChoice(value);
    setNum(number);
  };

  return (
    <main className="App">
      <div className=" text-xl text-primary p-5 cursor-pointer">
        <p onClick={() => navigator(-1)}>Back</p>
      </div>
      <div className=" flex w-[1240px]  gap-8 p-4 m-4 mx-auto ">
        <div
          onClick={() => {
            handleClick("Walloutlet", 1);
            setOpen(true);
            setChoice(4);
          }}
        >
          <Cards img={"../images/outlet.jpg"} name=" Wall Outlet " />
        </div>
      </div>
      <Guide open={open} onClose={() => setOpen(false)} choice={choice} />
    </main>
  );
}

export default Walloutlet;
