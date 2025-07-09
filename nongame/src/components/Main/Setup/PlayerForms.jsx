import { useContext } from "react";
import { GameContext } from "../../../GameContext";
import PlayerForm from "./PlayerForms/PlayerForm";

const PlayerForms = () => {
  const { players } = useContext(GameContext);

  // Render player form cards for active players
  return players.map(
    (player) =>
      player.isActive && <PlayerForm key={player.id} player={player} />
  );
};

export default PlayerForms;
