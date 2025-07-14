import { useContext } from "react";
import { GameContext } from "../../../../GameContext";

const PlayerCard = ({ player, index }) => {
  const { players, numberOfPlayers, totalTurns } = useContext(GameContext);

  const style = {
    border:
      (totalTurns - 1) % numberOfPlayers === index && "5px solid MidnightBlue",
    backgroundColor:
      player.laps > 0 && player.laps === Math.max(...players.map((i) => i.laps))
        ? "LightGoldenRodYellow"
        : "White",
  };

  return (
    <div className="white-bg gray-hover" style={style}>
      <span className="emoji">{player.emoji}</span>
      <br />
      {player.name}
      <br />
      Laps: {player.laps}
    </div>
  );
};

export default PlayerCard;
