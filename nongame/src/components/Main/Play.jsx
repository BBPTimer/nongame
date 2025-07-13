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
      <div className="flexbox">
        <div className="white-bg gray-hover">
          <Dice />
        </div>
        <div id="up-next" className="white-bg gray-hover">
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
      <NewGameButton buttonText={"New Game"} />
      <br />
    </>
  );
};

export default Play;
