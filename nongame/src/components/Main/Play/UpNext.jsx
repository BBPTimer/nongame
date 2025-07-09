import { useContext } from "react";
import { GameContext } from "../../../GameContext";

const UpNext = () => {
  const { players, numberOfPlayers, totalTurns } = useContext(GameContext);

  if (totalTurns === 0) {
    return <p>Have fun!</p>;
  } else if (numberOfPlayers === 1) {
    return <p>{players[0].name}, just keep rolling and responding!</p>;
  } else {
    return (
      <p>
        After {players[(totalTurns - 1) % numberOfPlayers].name} responds to the
        prompt, {players[totalTurns % numberOfPlayers].name} will roll.
      </p>
    );
  }
};

export default UpNext;
