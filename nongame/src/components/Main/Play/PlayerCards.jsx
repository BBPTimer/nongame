import { useContext } from "react";
import { GameContext } from "../../../GameContext";
import PlayerCard from "./PlayerCard/PlayerCard";

const PlayerCards = () => {
  const { players } = useContext(GameContext);

  // Render player cards
  const renderPlayerCards = players.map((player, index) => (
    <PlayerCard key={player.id} player={player} index={index} />
  ));

  return <div className="player-cards">{renderPlayerCards}</div>;
};

export default PlayerCards;
