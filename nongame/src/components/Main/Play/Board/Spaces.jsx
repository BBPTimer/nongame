import { useContext } from "react";
import { GameContext } from "../../../../GameContext";

const Spaces = () => {
  const { players, activeSpace } = useContext(GameContext);

  // Initialize divs
  let spaces = [];
  for (let i = 0; i < 16; i++) {
    // Initialize div format and content
    let promptText = "";
    let background = "white";
    let emojis = [];

    // Set up div format and content
    if (i % 2 === 0) {
      promptText = "Draw from the Deck!";
      background = "lightskyblue";
    } else if (i % 4 === 1) {
      promptText = "Question or Comment";
      background = "lightgreen";
    } else if (i % 4 === 3) {
      promptText = "Talk About a Time...";
      background = "lightpink";
    }

    // Place emojis
    for (let player of players) {
      player.space == i && emojis.push(player.emoji);
    }

    // Create space divs
    spaces.push(
      <div
        key={i}
        className={"space" + i}
        style={{
          backgroundColor: background,
          border: activeSpace == i && "5px solid midnightblue",
        }}
      >
        {promptText}
        <br />
        <span className="emoji">{emojis}</span>
      </div>
    );
  }

  return spaces;
};

export default Spaces;
