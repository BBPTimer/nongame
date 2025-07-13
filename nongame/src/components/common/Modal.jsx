import { useState } from "react";
import "./Modal.css";

const Modal = ({ modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <span
        className="material-symbols-outlined shake"
        onClick={() => setIsModalOpen(true)}
      >
        info
      </span>
      <div
        className="modal"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-content">
          <span className="close-modal" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          {modalContent}
        </div>
      </div>
    </>
  );
};

export default Modal;
