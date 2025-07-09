import { useContext } from "react";
import { GameContext } from "../../../../GameContext";

const PlayerCard = ({ player, index }) => {
  const { numberOfPlayers, totalTurns } = useContext(GameContext);

  return (
    <div
      className="player-card"
      style={{
        border:
          (totalTurns - 1) % numberOfPlayers === index &&
          "5px solid midnightblue",
      }}
    >
      <span className="emoji">{player.emoji}</span>
      <br />
      {player.name}
      <br />
      Laps: {player.laps}
    </div>
  );
};

export default PlayerCard;
