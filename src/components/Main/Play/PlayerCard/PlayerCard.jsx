import { use } from "react";
import { GameContext } from "../../../../contexts/GameContext";

const PlayerCard = ({ player, index }) => {
  const { players, numberOfPlayers, totalTurns } = use(GameContext);

  const style = {
    // Set border to blue if active player
    border:
      (totalTurns - 1) % numberOfPlayers === index && "5px solid MidnightBlue",
    // Set background color to gold if player has highest sum of rolls
    backgroundColor:
      // No gold background if 1-player game
      players.length > 1 &&
      // No gold background if sumOfRolls is 0
      player.sumOfRolls > 0 &&
      player.sumOfRolls === Math.max(...players.map((p) => p.sumOfRolls)) &&
      "LightGoldenRodYellow",
  };

  return (
    <div className="gray-hover" style={style}>
      <span className="emoji">{player.emoji}</span>
      <br />
      {player.name}
      <br />
      Laps: {player.laps}
    </div>
  );
};

export default PlayerCard;
