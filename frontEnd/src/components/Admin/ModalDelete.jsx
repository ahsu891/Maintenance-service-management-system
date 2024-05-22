import React from "react";

const ModalDelete = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-md">Are you sure you want to delete this ?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-primary text-white  py-1 px-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-danger text-md  text-white py-1 px-3 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
