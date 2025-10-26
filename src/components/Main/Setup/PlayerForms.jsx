import { use } from "react";
import { GameContext } from "../../../contexts/GameContext";
import PlayerForm from "./PlayerForms/PlayerForm";

const PlayerForms = () => {
  const { players } = use(GameContext);

  // Render player form cards for active players
  return players.map(
    (player) =>
      player.isActive && <PlayerForm key={player.id} player={player} />
  );
};

export default PlayerForms;
