import { useContext } from "react";
import { GameContext } from "../../GameContext";

const NewGameButton = ({ buttonText, className }) => {
  const { setIsNewGame } = useContext(GameContext);

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
