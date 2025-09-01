import { useContext } from "react";
import { GameContext } from "../../../GameContext";

const UpNext = () => {
  const { players, numberOfPlayers, roll, totalTurns } =
    useContext(GameContext);

  const positiveExclamations = [
    "Yay!",
    "Booyah!",
    "Heck yeah!",
    "Bingo bango!",
    "Woohoo!",
    "Zing!",
    "Hot dog!",
    "Oh, baby!",
    "Look at you go!",
    "Yessiree!",
    "Holy mackerel!",
    "Well, butter my biscuit!",
    "Yippee ki-yay!",
    "Ka-chow!",
    "Score!",
    "That’s what I’m talking about!",
    "Hot diggity dog!",
    "Oh, snap!",
    "Ka-boom!",
  ];

  const negativeExclamations = [
    "Whoopsie!",
    "Oh biscuits!",
    "Cheese and crackers!",
    "Crikey!",
    "Jiminy Crickets!",
    "Holy guacamole!",
    "Oh, snap!",
    "Shucks!",
    "Dagnabbit!",
    "What in tarnation?!",
    "Great googly moogly!",
    "Ay caramba!",
    "Mother of pearl!",
    "Curses!",
    "Zoinks!",
    "Ruh-roh!",
    "Egad!",
    "For the love of pizza!",
  ];

  if (totalTurns === 0) {
    return <p>Have fun!</p>;
  } else if (numberOfPlayers === 1) {
    return <p>{players[0].name}, just keep rolling and responding!</p>;
  } else {
    return (
      <>
        {roll == 1 && "1?! " + negativeExclamations[Math.floor(Math.random() * negativeExclamations.length)] + " "}
        {roll == 6 && "6?! " + positiveExclamations[Math.floor(Math.random() * positiveExclamations.length)] + " "}
        After {players[(totalTurns - 1) % numberOfPlayers].name} responds to the
        prompt, {players[totalTurns % numberOfPlayers].name} will roll.
      </>
    );
  }
};

export default UpNext;
