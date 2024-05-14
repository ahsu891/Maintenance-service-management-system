import React, { useState } from "react";
import Modal from "./Modal";
import axios from "../../api/axios";
import toast from "react-hot-toast";
const URL_R = "/assign/rejectMessage";
const RejectionMessage = ({ request_id, setRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (reason) => {
    // Handle submission of reason

    try {
      const response = await axios.post(URL_R, { request_id, reason });
      //   console.log(response.data);

      toast.success(response.data);
      setRefresh((e) => !e);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        type="button"
        className="flex w-auto justify-self-end rounded bg-danger p-3 px-8 font-medium text-gray"
      >
        Reject
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RejectionMessage;
