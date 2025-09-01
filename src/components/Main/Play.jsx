import { useContext } from "react";
import { GameContext } from "../../GameContext";
import Board from "./Play/Board";
import Dice from "./Play/Dice";
import UpNext from "./Play/UpNext";
import PlayerCards from "./Play/PlayerCards";

const Play = () => {
  const { setIsGameComplete } = useContext(GameContext);

  return (
    <>
      <Board />
      <br />
      <div className="flexbox">
        <div className="gray-hover">
          <Dice />
        </div>
        <div id="up-next" className="gray-hover">
          <em>
            <UpNext />
          </em>
        </div>
      </div>
      <br />
      <div className="flexbox">
        <PlayerCards />
      </div>
      <br />
      <button onClick={() => setIsGameComplete(true)}>End Game</button>
      <br />
    </>
  );
};

export default Play;
