import { useContext } from "react";
import { GameContext } from "../../GameContext";
import NewGameButton from "../common/NewGameButton";

const Results = () => {
  const { players } = useContext(GameContext);

  // Deep copy players array
  let playersRanked = structuredClone(players);
  // Sort players array by totalTurns descending
  playersRanked.sort((a, b) => b.sumOfRolls - a.sumOfRolls);

  return (
    <>
      <h1>Good game!</h1>
      <div className="white-bg">
        {playersRanked.map((player, index) => (
          <div key={player.id}>
            {index == 0 && (
              <span
                className="material-symbols-outlined"
                style={{ color: "Gold" }}
              >
                trophy
              </span>
            )}
            {index == 1 && (
              <span
                className="material-symbols-outlined"
                style={{ color: "Silver" }}
              >
                workspace_premium
              </span>
            )}
            {index == 2 && (
              <span
                className="material-symbols-outlined"
                style={{ color: "SaddleBrown" }}
              >
                license
              </span>
            )}
            {index > 2 && index + 1 + ".\t"}
            {player.emoji}
            <br />
            {player.name}
            <br />
            <br />
            {"Laps: "} {player.laps}
            <br />
            {"Total spaces: "} {player.sumOfRolls}
            <br />
            {index < playersRanked.length - 1 && <hr />}
          </div>
        ))}
      </div>
      <br />
      <NewGameButton buttonText="Play Again" className="pulsate" />
      <br />
    </>
  );
};

export default Results;
