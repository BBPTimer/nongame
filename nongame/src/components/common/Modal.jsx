import { useState } from "react";
import './Modal.css';

const Modal = ({ modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src="src/assets/info.svg"
        className={"modal-img shake"}
        onClick={() => setIsModalOpen(true)}
        alt="Open Modal"
        height={"15px"}
      />
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
