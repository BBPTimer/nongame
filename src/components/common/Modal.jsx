import { useState } from "react";
import "./Modal.css";

const Modal = ({ modalContent, modalFunction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    // If modalFunction is passed in, run it
    modalFunction && modalFunction();

    setIsModalOpen(true);
  };

  return (
    <>
      <span className="material-symbols-outlined shake" onClick={handleClick}>
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
