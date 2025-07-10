import { useContext } from "react";
import { GameContext } from "../../GameContext";
import CustomDeckListItem from "./CustomDeckListItem/CustomDeckListItem";

const CustomDeckList = () => {
  const { customDeck } = useContext(GameContext);

  return customDeck.map((prompt) => <CustomDeckListItem prompt={prompt} />);
};

export default CustomDeckList;
