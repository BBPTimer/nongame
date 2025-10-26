import { use } from "react";
import { GameContext } from "../../../../contexts/GameContext";

const PlayerForm = ({ player }) => {
  const { players, setPlayers } = use(GameContext);

  // Update players array with new name value
  const handleChange = (event) =>
    setPlayers(
      players.map((player) =>
        player.id == event.target.id
          ? { ...player, name: event.target.value }
          : { ...player }
      )
    );

  return (
    <div key={player.id}>
      {player.emoji} Player {player.id} name:{" "}
      <input
        type="text"
        id={player.id}
        value={player.name}
        onChange={handleChange}
        maxLength="20"
        required
      ></input>
    </div>
  );
};

export default PlayerForm;
