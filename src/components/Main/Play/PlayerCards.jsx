import { useContext } from "react";
import { GameContext } from "../../../GameContext";
import PlayerCard from "./PlayerCard/PlayerCard";

const PlayerCards = () => {
  const { players } = useContext(GameContext);

  // Render player cards
  const playerCards = players.map((player, index) => (
    <PlayerCard key={player.id} player={player} index={index} />
  ));

  return <>{playerCards}</>;
};

export default PlayerCards;
