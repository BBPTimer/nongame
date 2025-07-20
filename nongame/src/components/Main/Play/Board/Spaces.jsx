import { useContext } from "react";
import { GameContext } from "../../../../GameContext";

const Spaces = () => {
  const { players, activeSpace } = useContext(GameContext);

  // Initialize divs
  let spaces = [];
  for (let i = 0; i < 12; i++) {
    // Initialize div format and content
    let background = "";
    let backgroundImageURL = "";
    let emojis = [];

    // Set up div format and content
    if (i % 2 === 0) {
      background = "LightSkyBlue";
      backgroundImageURL = "src/assets/categories/deck.svg";
    } else if (i % 4 === 1) {
      background = "LightGreen";
      backgroundImageURL = "src/assets/categories/questioncomment.svg";
    } else if (i % 4 === 3) {
      background = "LightPink";
      backgroundImageURL = "src/assets/categories/feelings.svg";
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
          backgroundImage: "url(" + backgroundImageURL + ")",
          backgroundRepeat: "repeat",
          border: activeSpace == i && "5px solid MidnightBlue",
        }}
      >
        <span className="emoji">{emojis}</span>
      </div>
    );
  }

  return spaces;
};

export default Spaces;
