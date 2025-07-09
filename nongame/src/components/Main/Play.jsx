import { useContext } from "react";
import { GameContext } from "../../GameContext";
import Board from "./Play/Board";
import Dice from "./Play/Dice";
import UpNext from "./Play/UpNext";
import PlayerCards from "./Play/PlayerCards";

const Play = () => {
  const { setIsNewGame } = useContext(GameContext);

  const handleClick = () => {
    setIsNewGame(true);
  };

  return (
    <>
      <Board />
      <br />
      <Dice />
      <em><UpNext /></em>
      <br />
      <PlayerCards />
      <br />
      <button onClick={handleClick}>New Game</button>
    </>
  );
};

export default Play;
