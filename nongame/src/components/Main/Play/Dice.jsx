import { useContext } from "react";
import { GameContext } from "../../../GameContext";

const Dice = () => {
  const {
    players,
    setPlayers,
    numberOfPlayers,
    roll,
    setRoll,
    setActiveSpace,
    totalTurns,
    setTotalTurns,
  } = useContext(GameContext);

  const handleClick = () => {
    // Play dice roll sound
    new Audio("/src/assets/dice/roll.mp3").play();

    // Set roll to random number between 1 and 6
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    setRoll(randomNumber);

    setPlayers(
      players.map((player, index) => {
        // If active player
        if (totalTurns % numberOfPlayers === index) {
          let nextSumOfRolls = player.sumOfRolls + randomNumber;

          // Set active space
          setActiveSpace(nextSumOfRolls % 16);

          // Update active player's sumOfRolls
          return {
            ...player,
            sumOfRolls: nextSumOfRolls,
            space: nextSumOfRolls % 16,
            laps: Math.floor(nextSumOfRolls / 16),
          };
        } else {
          return { ...player };
        }
      })
    );

    // Increment total rolls by 1
    setTotalTurns(totalTurns + 1);
  };

  return (
    <div>
      <img
        onClick={handleClick}
        src={"/src/assets/dice/" + roll + ".svg"}
        alt={"Dice roll: " + roll}
        width="64px"
        className="shake"
      />
    </div>
  );
};

export default Dice;
