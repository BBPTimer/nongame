import { useContext } from "react";
import { GameContext } from "../../../GameContext";
import { resetDeck } from "../../../common/utils";

const CustomDeckListItem = ({ prompt }) => {
  const { customDeck, setCustomDeck, customDeckName } = useContext(GameContext);

  const handleRemovePrompt = (id) => {
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
    <tr>
      <td width={"100%"}>{prompt.promptText}</td>
      <td className="custom-deck-list-item">
        <span
          className="material-symbols-outlined shake"
          onClick={() => handleRemovePrompt(prompt.id)}
          title="Delete Prompt"
        >
          delete
        </span>
      </td>
    </tr>
  );
};

export default CustomDeckListItem;
