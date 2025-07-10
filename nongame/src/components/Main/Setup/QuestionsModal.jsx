import { useContext, useState } from "react";
import { GameContext } from "../../../GameContext";

const QuestionsModal = () => {
  const { customDeck, customDeckName } = useContext(GameContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleModalOpenClick = () => {
    // If user chose custom deck, set tooltip from customDeck array
    if (localStorage.getItem("deck") === customDeckName) {
      setModalContent(customDeck.map((prompt) => prompt.promptText).join("\n"));
      // Otherwise fetch deck
    } else {
      fetch("/decks/" + localStorage.getItem("deck") + ".txt")
        .then((response) => response.text())
        .then((data) => setModalContent(data));
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <img
        src="src/assets/info.svg"
        onClick={handleModalOpenClick}
        alt="Deck Questions"
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

export default QuestionsModal;
