// import ProductOne from '../images/product/product-01.png';
// import ProductTwo from '../images/product/product-02.png';
// import ProductThree from '../images/product/product-03.png';
// import ProductFour from '../images/product/product-04.png';
import FormInventory from "../Inventory/FormInventory";
const TableTwo = () => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            List Item
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Item Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Updated</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Quanitity</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img
                  src={
                    "data:image/jpeg;base64,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"
                  }
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                Apple Watch Series 7
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-right sm:flex">
            <p className="text-sm text-black dark:text-white">Electronics</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">$2621212121219</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">22</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">$44444444</p>
          </div>
        </div>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={"ProductTwo"} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                Macbook Pro M1
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">Electronics</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">$546</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">34</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">$125</p>
          </div>
        </div>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={"ProductThree"} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                Dell Inspiron 15
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">Electronics</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">$443</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">64</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">$247</p>
          </div>
        </div>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={"ProductFour"} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                HP Probook 450
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">Electronics</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">$499</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">72</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">$103</p>
          </div>
        </div>
      </div>
      <div>
        <div className="my-8">
          <FormInventory />
        </div>
      </div>
    </div>
  );
};

export default TableTwo;
