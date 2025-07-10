import Board from "./Play/Board";
import Dice from "./Play/Dice";
import UpNext from "./Play/UpNext";
import PlayerCards from "./Play/PlayerCards";
import NewGameButton from "../common/NewGameButton";

const Play = () => {
  return (
    <>
      <Board />
      <br />
      <Dice />
      <em><UpNext /></em>
      <br />
      <PlayerCards />
      <br />
      <NewGameButton buttonText={"New Game"} />
    </>
  );
};

export default Play;
