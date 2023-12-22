function RowAssign({
  i,
  title,
  categories,
  request_name,
  technician_name,
  priority,
  status,
  block_no,
}) {
  return (
    <tr
    // onClick={() => setVisible((c) => !c)}
    >
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{i}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{title}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{categories}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{technician_name}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{request_name}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{block_no}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className=" rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">
          {priority}
        </p>
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className=" rounded-full  bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium  text-warning">
          {status}
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">djvhidsjvh</h5>
      </td>
    </tr>
  );
}

export default RowAssign;
