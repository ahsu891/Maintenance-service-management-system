function ConplainForm() {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Send Complaint
        </h3>
      </div>
      <form method="POST">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="title"
                className="mb-2.5 block text-black dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Enter thetitle "
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2.5 block text-black dark:text-white"
            >
              Description
            </label>
            <textarea
              name="description"
              rows={6}
              id="description"
              placeholder="Type your Description"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>
          {/* <div className="w-full xl:w-1/2">
        <label className="mb-2.5 block text-black dark:text-white">
          Image Optional
        </label>
        <input
          type="File"
          name="image"
          defaultValue={"Ahmed"}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div> */}
        </div>

        <div className=" mb-5 mr-4 flex flex-row justify-end gap-2">
          <button
            type="reset"
            className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray"
          >
            Cancel
          </button>
          <button className="flex w-auto justify-self-end rounded bg-primary p-3 font-medium text-gray">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConplainForm;
