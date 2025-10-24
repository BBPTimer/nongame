import { useContext, useState } from "react";
import { GameContext } from "../../../GameContext";
import { resetDeck } from "../../../common/utils";

const CustomDeckListItem = ({ prompt }) => {
  const { customDeck, setCustomDeck, customDeckName } = useContext(GameContext);

  const [editingPrompt, setEditingPrompt] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const handleEditPromptClick = () => {
    // Set textarea default value to existing prompt
    setTextareaValue(prompt.promptText);
    // Display form
    setEditingPrompt(true);
  };

  const handleEditPromptSave = (id) => {
    // Alert and return if empty textarea
    if (!textareaValue) {
      alert("Prompt must contain at least 1 character.");
      return;
    }

    // Update prompt text
    let updatedDeck = customDeck.map((prompt) => {
      if (prompt.id === id) {
        prompt.promptText = textareaValue;
      }
      return prompt;
    });

    // Update customDeck
    setCustomDeck(updatedDeck);

    // Hide form
    setEditingPrompt(false);
    return;
  };

  const handleRemovePrompt = (id) => {
    // Early return if user does not want to delete prompt
    if (!confirm("Are you sure you want to delete this prompt?")) {
      return;
    }
    // Create new array that filters out element with Id matching Id sent by map
    const newDeck = customDeck.filter((prompt) => prompt.id !== id);
    // Set state customDeck to new array
    setCustomDeck(newDeck);
    // Store new LS customDeck; LS cannot store array of objects so we must convert it to JSON string
    localStorage.setItem("customDeck", JSON.stringify(newDeck));
    // If user's LS deck choice is their custom deck AND if new array length equals 0, meaning no prompts exist in custom deck, change LS deck to default
    customDeckName === localStorage.getItem("deck") &&
      newDeck.length === 0 &&
      resetDeck();
  };

  return (
    <>
      {editingPrompt ? (
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
              onClick={() => handleEditPromptSave(prompt.id)}
              title="Save Prompt"
            >
              save
            </span>
          </td>
          <td>
            <span
              className="material-symbols-outlined shake"
              onClick={() => setEditingPrompt(false)}
              title="Cancel"
            >
              close
            </span>
          </td>
        </tr>
      ) : (
        <tr>
          <td width={"100%"}>{prompt.promptText}</td>
          <td>
            <span
              className="material-symbols-outlined shake"
              onClick={handleEditPromptClick}
              title="Edit Prompt"
            >
              edit
            </span>
          </td>
          <td>
            <span
              className="material-symbols-outlined shake"
              onClick={() => handleRemovePrompt(prompt.id)}
              title="Delete Prompt"
            >
              delete
            </span>
          </td>
        </tr>
      )}
    </>
  );
};

export default CustomDeckListItem;
