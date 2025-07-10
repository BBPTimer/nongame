import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../../GameContext";

const Prompt = () => {
  const {
    players,
    isSetupComplete,
    prompts,
    setPrompts,
    prompt,
    setPrompt,
    activeSpace,
    totalTurns,
    customDeck,
    customDeckName,
  } = useContext(GameContext);

  const isFirstRender = useRef(true);

  // When isSetupComplete changes, set prompts
  useEffect(() => {
    // If user chose custom deck, set prompts from customDeck array
    if (localStorage.getItem("deck") === customDeckName) {
      setPrompts(customDeck.map((prompt) => prompt.promptText));
      // Otherwise fetch deck
    } else {
      fetch("/decks/" + localStorage.getItem("deck") + ".txt")
        .then((response) => response.text())
        .then((data) => setPrompts(data.split("\n")));
    }
  }, [isSetupComplete]);

  const feelings = [
    "Accepting/Open",
    "Aliveness/Joy",
    "Angry/Annoyed",
    "Courageous/Powerful",
    "Connected/Loving",
    "Curious",
    "Despair/Sad",
    "Disconnected/Numb",
    "Embarrassed/Shame",
    "Fear",
    "Fragile",
    "Grateful",
    "Guilt",
    "Hopeful",
    "Powerless",
    "Tender",
    "Stressed/Tense",
    "Unsettled/Doubt",
  ];

  let promptText = "";
  let background = "";

  if (totalTurns === 0) {
    promptText = (
      <>{players[0].name}, roll the dice and then respond to the prompt!</>
    );
    background = "white";
  } else if (activeSpace % 2 === 0) {
    promptText = prompts[Math.floor(Math.random() * prompts.length)];
    background = "lightskyblue";
  } else if (activeSpace % 4 === 1) {
    promptText = (
      <>
        Ask someone a question
        <br />
        OR
        <br />
        Comment on any subject
      </>
    );
    background = "lightgreen";
  } else if (activeSpace % 4 === 3) {
    promptText =
      "Talk about a time that you felt " +
      feelings[Math.floor(Math.random() * feelings.length)].toLowerCase() +
      ".";
    background = "lightpink";
  }

  // Set isFirstRender = true on first render;
  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  useEffect(() => {
    // Update prompt if this is not the first render (does not update prompt if component unmounts and re-mounts) OR if this is the first turn (prevents blank prompt)
    (!isFirstRender.current || totalTurns === 0) && setPrompt(promptText);
    // Sets isFirstRender to false
    isFirstRender.current = false;
    // Only update prompt when totalTurns changes
  }, [totalTurns]);

  return (
    <div className="prompt" style={{ backgroundColor: background }}>
      {prompt}
    </div>
  );
};

export default Prompt;
