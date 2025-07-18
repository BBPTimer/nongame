import { useContext } from "react";
import { GameContext } from "../../../../GameContext";

const Spaces = () => {
  const { players, activeSpace } = useContext(GameContext);

  // Initialize divs
  let spaces = [];
  for (let i = 0; i < 16; i++) {
    // Initialize div format and content
    let promptText = "";
    let background = "";
    let backgroundImageURL = "";
    let emojis = [];

    // Set up div format and content
    if (i % 2 === 0) {
      promptText = (
        <span className="material-symbols-outlined">playing_cards</span>
      );
      background = "LightSkyBlue";
      backgroundImageURL = "src/assets/nature/water.svg";
    } else if (i % 4 === 1) {
      promptText = (
        <span className="material-symbols-outlined">question_exchange</span>
      );
      background = "LightGreen";
      backgroundImageURL = "src/assets/nature/tree.svg";
    } else if (i % 4 === 3) {
      promptText = (
        <span className="material-symbols-outlined">comedy_mask</span>
      );
      background = "LightPink";
      backgroundImageURL = "src/assets/nature/volcano.svg";
    }

    // Place emojis
    for (let player of players) {
      // Insert line break if greater than 3 emojis
      emojis.length === 3 && emojis.push(<br />);
      player.space == i && emojis.push(player.emoji);
    }

    // Create space divs
    spaces.push(
      <div
        key={i}
        className={"space" + i}
        style={{
          backgroundColor: background,
          backgroundImage: "url(" + backgroundImageURL + ")",
          backgroundRepeat: "repeat",
          border: activeSpace == i && "5px solid MidnightBlue",
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
