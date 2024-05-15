import React, { useState } from "react";

export default function ModalRequester({ isOpen, onClose, onSubmit }) {
  const [description, setDescription] = useState("");

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    // Call onSubmit callback with the description
    onSubmit(description);
    // Clear description state
    setDescription("");
    // Close the modal
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 transition-opacity bg-white bg-opacity-50  backdrop-filter backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium  text-graydark mb-4">
                    Enter Your Complain
                  </h3>
                  <textarea
                    className="min-w-[full] md:w-[300px] h-32 border border-gray rounded-md p-2 mb-4"
                    placeholder="Enter your complain"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="w-1/3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Submit
                    </button>
                    <button
                      onClick={onClose}
                      type="button"
                      className="w-1/3 inline-flex justify-center rounded-md border border-gray shadow-sm px-4 py-2 bg-danger text-base font-medium  text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
