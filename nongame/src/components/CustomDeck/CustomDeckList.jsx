import { useContext } from "react";
import { GameContext } from "../../GameContext";
import CustomDeckListItem from "./CustomDeckListItem/CustomDeckListItem";

const CustomDeckList = () => {
  const { customDeck } = useContext(GameContext);

  return customDeck.length > 0 ? customDeck.map((prompt) => <CustomDeckListItem key={prompt.id} prompt={prompt} />) : "Add your first prompt to get started!";
};

export default CustomDeckList;
