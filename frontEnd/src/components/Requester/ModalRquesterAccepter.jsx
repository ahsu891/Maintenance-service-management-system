import { useState } from "react";
import ModalRequester from "./ModalRequester";
import { AiOutlineMessage } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import { socket } from "../../layout/DefaultLayoutReq";
const URL_R = "/assign/complainMessage";
export default function ModalRquesterAccepter({
  status,
  request_id,
  setReff,
  handleConform,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleNotification = (title) => {
    socket.emit("sendNotification", {
      id: new Date(),
      user_id: localStorage.getItem("user_id"),
      type: "Complaint Request",
      title,
    });
  };
  const handleSubmitComplaint = async (description) => {
    // Handle complaint submission here (e.g., send it to a server)
    console.log("Complaint Description:", description);

    try {
      const response = await axios.post(URL_R, { request_id, description });
      //   console.log(response.data);

      toast.success(response.data);
      handleConform(request_id);
      handleNotification(description);
      setReff((e) => !e);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container mx-auto mt-1">
      <button
        // onClick={handleConform}
        onClick={handleOpenModal}
        disabled={status === "Completed" ? false : true}
        className=" outline outline-2 outline-offset-2 outline-primary px-3 py-0.5 rounded-md text-white"
      >
        <span className="flex flex-row text-primary items-center gap-1 ">
          <AiOutlineMessage className="text-lg" /> Complain
        </span>
      </button>
      <ModalRequester
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitComplaint}
      />
    </div>
  );
}
