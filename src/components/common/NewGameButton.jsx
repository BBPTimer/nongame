import { use } from "react";
import { GameContext } from "../../contexts/GameContext";

const NewGameButton = ({ buttonText, className }) => {
  const { setIsNewGame } = use(GameContext);

  const handleClick = (event) => {
    event.preventDefault();
    setIsNewGame(true);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {buttonText}
    </button>
  );
};

export default NewGameButton;
