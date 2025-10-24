import { useContext, useState } from "react";
import { resetDeck } from "../common/utils";
import { GameContext } from "../GameContext";
import Modal from "./common/Modal";
import CustomDeckList from "./CustomDeck/CustomDeckList";
import UploadDeck from "./CustomDeck/UploadDeck";

const CustomDeck = () => {
  const { customDeck, setCustomDeck, customDeckName, setCustomDeckName } =
    useContext(GameContext);

  const [editingDeckName, setEditingDeckName] = useState(false);
  const [addingPrompt, setAddingPrompt] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  // Get LS nextId or start at 1
  let nextId = localStorage.getItem("nextId") || 1;

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
    setEditingDeckName(false);
  };

  const handleAddPrompt = () => {
    // Alert and return if empty textarea
    if (!textareaValue) {
      alert("Prompt must contain at least 1 character.");
      return;
    }

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

  const handleCancelPromptClick = () => {
    setAddingPrompt(false);
    setTextareaValue(null);
  };

  const handleReset = () => {
    // Confirm before proceeding; early return if cancel
    if (!confirm("Are you sure you want to reset your deck?")) {
      return;
    }
    // If user's LS deck choice is their custom deck, change LS deck to default
    customDeckName === localStorage.getItem("deck") && resetDeck();
    // Reset state customDeckName to "My Deck"
    setCustomDeckName("My Deck");
    // Reset LS customDeckName to "My Deck"
    localStorage.setItem("customDeckName", "My Deck");
    // Reset LS nextId to 1
    localStorage.setItem("nextId", 1);
    // Reset state customDeck to empty array
    setCustomDeck([]);
    // Remove LS custom deck
    localStorage.removeItem("customDeck");
    // Close editing
    setEditingDeckName(false);
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
              Create your custom deck! First, click{" "}
              <span
                className="material-symbols-outlined"
                title="Edit Deck Name"
              >
                edit
              </span>{" "}
              to give your custom deck a name. Deck names are limited to 25
              characters to keep the Game Setup form from stretching too far.
            </p>
            <p>
              Next, click{" "}
              <span className="material-symbols-outlined" title="Add Prompt">
                add_comment
              </span>{" "}
              to add in your prompts! Prompts are limited to 130 characters to
              avoid the game board stretching too far.
            </p>
            <p>
              As long as your custom deck has at least 1 prompt, it will show up
              as a deck option in the Game Setup form. We recommend adding 20-30
              prompts to your custom deck.
            </p>
            <p>
              The Nongame! stores your custom deck in your browser's cache.
              Click{" "}
              <span className="material-symbols-outlined" title="Reset Deck">
                delete
              </span>{" "}
              to clear your custom deck from your browser's cache. Please be
              aware that if you manually clear your browser's cache, that action
              will also reset your custom deck!
            </p>
            <p>
              If you want to archive or share your custom deck, use the Download
              and Upload buttons! Uploaded decks are limited to 1000 prompts to
              ensure snappy deck validation.
            </p>
          </>
        }
      />
      {editingDeckName ? (
        <>
          <br />
          <form onSubmit={handleSaveName} className="inline-form">
            <label htmlFor="save-name">Deck: </label>
            <input
              id="save-name"
              type="text"
              defaultValue={customDeckName}
              maxLength={"25"}
              required
            ></input>
            <button className="pulsate">Save</button>
            <button onClick={() => setEditingDeckName(false)}>Cancel</button>
          </form>
          <br />
          <br />
        </>
      ) : (
        <h2>
          {customDeckName}{" "}
          <span
            onClick={() => setEditingDeckName(true)}
            className="material-symbols-outlined shake"
            title="Edit Deck Name"
          >
            edit
          </span>
          <span
            onClick={handleReset}
            className="material-symbols-outlined shake"
            title="Reset Deck"
          >
            delete
          </span>
        </h2>
      )}
      <div className="white-bg">
        <table className="left-align">
          <tbody>
            {addingPrompt ? (
              <tr>
                <td>
                  <textarea
                    value={textareaValue}
                    onChange={(event) => setTextareaValue(event.target.value)}
                    rows="4"
                    cols="40"
                    maxLength="130"
                  ></textarea>
                </td>
                <td>
                  <span
                    className="material-symbols-outlined pulsate"
                    onClick={handleAddPrompt}
                    title="Save Prompt"
                  >
                    save
                  </span>
                </td>
                <td>
                  <span
                    className="material-symbols-outlined shake"
                    onClick={handleCancelPromptClick}
                    title="Cancel"
                  >
                    close
                  </span>
                </td>
              </tr>
            ) : (
              <tr>
                <td width={"100%"}>
                  <i>Add a new prompt!</i>
                </td>
                <td>
                  <span
                    className="material-symbols-outlined shake"
                    onClick={() => setAddingPrompt(true)}
                    title="Add Prompt"
                  >
                    add_comment
                  </span>
                </td>
              </tr>
            )}
            <CustomDeckList />
          </tbody>
        </table>
      </div>
      <br />
      <a
        href={URL.createObjectURL(
          new Blob([JSON.stringify(customDeck)], {
            type: "application/json",
          })
        )}
        download={customDeckName}
      >
        <button>Download</button>
      </a>
      <UploadDeck />
      <br />
    </>
  );
};

export default CustomDeck;
