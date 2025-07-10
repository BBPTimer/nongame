import { useContext } from "react";
import { GameContext } from "../../GameContext";

const NewGameButton = ({ buttonText }) => {
  const { setIsNewGame } = useContext(GameContext);

  const handleClick = (event) => {
    event.preventDefault();
    setIsNewGame(true);
  };

  return <button onClick={handleClick}>{buttonText}</button>;
};

export default NewGameButton;
