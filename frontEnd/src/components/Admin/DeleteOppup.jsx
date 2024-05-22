// src/App.js
import React, { useState } from "react";
import Modal from "./ModalDelete";
import { MdDelete } from "react-icons/md";
function DeleteOppup({ Delts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Item deleted");
    Delts();
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <button onClick={handleOpenModal} className="text-2xl">
        <MdDelete className="hover:text-danger" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DeleteOppup;
