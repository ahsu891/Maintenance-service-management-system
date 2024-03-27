import { useState } from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

function ItemBe({ allchecked, setAllChecked, id, name }) {
  const [count, setCount] = useState(0);
  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, { material: e.target.value, count }]);
    } else {
      setAllChecked(
        allchecked.filter((item) => item.material !== e.target.value)
      );
    }
    // console.log("sss", allchecked);
    // setAllData((e) => [allchecked, count]);
  }
  return (
    <div className="flex flex-row items-center w-full justify-between ">
      <div className=" flex flex-row items-center">
        <input
          id={`checkbox-item-11${id}`}
          type="checkbox"
          value={id}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />

        <label
          htmlFor="checkbox-item-11"
          className="w-full ms-2 text-sm font-medium text-gray-900 rounded   dark:text-gray-300"
        >
          {name}
        </label>
      </div>
      <span
        id={`checkbox-item-11${id}`}
        className="flex flex-row items-center "
      >
        <IoMdArrowDropleft
          onClick={() => {
            setCount((e) => e - 1);
            setAllChecked(
              allchecked.map((item) => {
                console.log(item.material, id);
                if (+item.material === id) {
                  return { material: item.material, count: item.count - 1 };
                }
                return item;
              })
            );
          }}
          className="text-3xl text-primary"
        />{" "}
        <span>{count}</span>{" "}
        <IoMdArrowDropright
          onClick={() => {
            setCount((e) => e + 1);
            setAllChecked(
              allchecked.map((item) => {
                console.log(item.material, id);
                if (+item.material === id) {
                  return { material: item.material, count: item.count + 1 };
                }
                return item;
              })
            );
          }}
          className="text-3xl text-primary"
        />
      </span>
    </div>
  );
}

export default ItemBe;
