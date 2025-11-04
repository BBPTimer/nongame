import { use, useState } from "react";
import { GameContext } from "../../../contexts/GameContext";

const Dice = () => {
  const {
    promptTypes,
    players,
    setPlayers,
    numberOfPlayers,
    roll,
    setRoll,
    activeSpace,
    setActiveSpace,
    totalTurns,
    setTotalTurns,
    promptHistory,
    rollHistory,
  } = use(GameContext);

  const [isAudioEnabled, setIsAudioEnabled] = useState(
    localStorage.getItem("isAudioEnabled") === null
      ? true
      : // Convert LS string to Boolean
        JSON.parse(localStorage.getItem("isAudioEnabled"))
  );

  const handleAudioClick = () => {
    localStorage.setItem("isAudioEnabled", !isAudioEnabled);
    setIsAudioEnabled(!isAudioEnabled);
  };

  const diceAudio = new Audio("/dice/roll.mp3");

  const incrementPromptHistory = (index) => {
    promptHistory.current[index] = {
      ...promptHistory.current[index],
      count: promptHistory.current[index].count + 1,
    };
  };

  const handleDiceClick = () => {
    // Play dice roll sound
    isAudioEnabled && diceAudio.play();

    // Set roll to random number between 1 and 6
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    setRoll(randomNumber);

    setPlayers(
      players.map((player, index) => {
        // If active player
        if (totalTurns % numberOfPlayers === index) {
          let nextSumOfRolls = player.sumOfRolls + randomNumber;

          // Set active space
          setActiveSpace(nextSumOfRolls % 12);

          // Update active player's sumOfRolls, space, and laps
          return {
            ...player,
            sumOfRolls: nextSumOfRolls,
            space: nextSumOfRolls % 12,
            laps: Math.floor(nextSumOfRolls / 12),
          };
        } else {
          return { ...player };
        }
      })
    );

    // Increment total rolls by 1
    setTotalTurns(totalTurns + 1);

    // Increment promptHistory
    if ((activeSpace + randomNumber) % 4 === 1 && promptTypes.questionComment) {
      incrementPromptHistory(1);
    } else if ((activeSpace + randomNumber) % 4 === 3 && promptTypes.feelings) {
      incrementPromptHistory(2);
    } else {
      incrementPromptHistory(0);
    }

    // Update rollHistory
    rollHistory.current.push(randomNumber);
  };

  return (
    <>
      <img
        src={"/dice/" + roll + ".svg"}
        onClick={handleDiceClick}
        alt={"Dice roll: " + roll}
        width="64px"
        className="shake"
      />
      <br />
      <span
        className="material-symbols-outlined shake"
        onClick={handleAudioClick}
        style={{ opacity: !isAudioEnabled && "0.3" }}
      >
        brand_awareness
      </span>
    </>
  );
};

export default Dice;
