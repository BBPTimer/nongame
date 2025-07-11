import { useContext, useState } from "react";
import { GameContext } from "../GameContext";
import { resetDeck } from "../common/utils";
import Modal from "./common/Modal";
import CustomDeckList from "./CustomDeck/CustomDeckList";

const CustomDeck = () => {
  const { customDeck, setCustomDeck, customDeckName, setCustomDeckName } =
    useContext(GameContext);

  const [editing, setEditing] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const handleSaveName = (event) => {
    // Prevent form submission
    event.preventDefault();
    // Set state customDeckName to input value
    setCustomDeckName(event.target.elements[0].value);
    // Set LS customDeckName
    localStorage.setItem("customDeckName", event.target.elements[0].value);
    // If user's LS deck choice is their custom deck, update LS deck to match new custom deck name
    if (customDeckName === localStorage.getItem("deck")) {
      localStorage.setItem("deck", event.target.elements[0].value);
    }
    // Close editing
    setEditing(false);
  };

  // Get LS nextId or start at 1
  let nextId = localStorage.getItem("nextId") || 1;

  const handleAddPrompt = (event) => {
    // Prevent form submission
    event.preventDefault();
    // Make copy of customDeck array and add new element with next Id and textarea value
    let newDeck = [...customDeck, { id: nextId++, promptText: textareaValue }];
    // Set state customDeck to new array
    setCustomDeck(newDeck);
    // Store new LS customDeck; LS cannot store array of objects so we must convert it to JSON string
    localStorage.setItem("customDeck", JSON.stringify(newDeck));
    // Store new LS nextId
    localStorage.setItem("nextId", nextId);
    // Clear textarea
    setTextareaValue("");
  };

  const handleReset = () => {
    // Confirm before proceeding; early return if cancel
    if (!confirm("Are you sure you want to reset your list?")) {
      return;
    }
    // If user's LS deck choice is their custom deck, change LS deck to default
    customDeckName === localStorage.getItem("deck") && resetDeck();
    // Reset state customDeckName to "Custom Deck"
    setCustomDeckName("Custom Deck");
    // Reset LS customDeckName to "Custom Deck"
    localStorage.setItem("customDeckName", "Custom Deck");
    // Reset LS nextId to 1
    localStorage.setItem("nextId", 1);
    // Reset state customDeck to empty array
    setCustomDeck([]);
    // Remove LS custom deck
    localStorage.removeItem("customDeck");
    // Close editing
    setEditing(false);
    // Clear textarea
    setTextareaValue("");
  };

  return (
    <>
      <h1>Custom Deck</h1>{" "}
      <Modal
        modalContent={
          <>
            <p>
              Create your custom deck! First, give your custom deck a name. Deck
              names are limited to 25 characters to keep the Game Setup form
              from stretching too far.
            </p>
            <p>
              Next, add in your prompts! Prompts are limited to 130 characters
              to avoid the game board stretching too far.
            </p>
            <p>
              As long as your custom deck has at least 1 prompt, it will show up
              as a deck option in the Game Setup form. We recommend adding 20-30
              prompts to your custom deck.
            </p>
            <p>
              The Nongame stores your custom deck in your browser's cache. The
              Reset Custom Deck button will clear your custom deck from your
              browser's cache. Please be aware that if you manually clear your
              browser's cache, that action will also reset your custom deck!
            </p>
          </>
        }
      />
      <br />
      <b>Deck Name: </b>
      {editing ? (
        <form onSubmit={handleSaveName} className="inline-form">
          <input
            type="text"
            defaultValue={customDeckName}
            maxLength={"25"}
            required
          ></input>
          <button>Save</button>
        </form>
      ) : (
        <>
          {customDeckName}{" "}
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <br />
      <form onSubmit={handleAddPrompt}>
        <label htmlFor="custom-prompt">Prompt:</label>
        <br />
        <textarea
          id="custom-prompt"
          value={textareaValue}
          onChange={(event) => setTextareaValue(event.target.value)}
          rows="4"
          cols="50"
          maxLength="130"
          required
        ></textarea>
        <br />
        <button>Add</button>
      </form>
      <ul className="custom-deck-list">
        <CustomDeckList />
      </ul>
      <br />
      <button onClick={handleReset}>Reset Custom Deck</button>
    </>
  );
};

export default CustomDeck;
