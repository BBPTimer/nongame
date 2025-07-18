import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../../../../GameContext";

const Prompt = () => {
  const {
    players,
    prompts,
    setPrompts,
    prompt,
    setPrompt,
    activeSpace,
    totalTurns,
    customDeck,
    customDeckName,
  } = useContext(GameContext);

  const isFirstRender = useRef();
  const promptsCopy = useRef([]);
  const feelings = useRef([]);

  const initializeFeelings = () => {
    feelings.current = [
      "Accepting or Open",
      "Aliveness or Joy",
      "Angry or Annoyed",
      "Courageous or Powerful",
      "Connected or Loving",
      "Curious",
      "Despair or Sad",
      "Disconnected or Numb",
      "Embarrassed or Shame",
      "Fear",
      "Fragile",
      "Grateful",
      "Guilt",
      "Hopeful",
      "Powerless",
      "Tender",
      "Stressed or Tense",
      "Unsettled or Doubt",
    ];
  };

  // Set isFirstRender = true on first render;
  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  // When isFirstRender changes, fetch prompts
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
    // Make copy of original prompts array to prevent need to re-fetch
    promptsCopy.current = prompts.slice();
  }, [isFirstRender]);

  // Set prompt when totalTurns changes
  useEffect(() => {
    // Update prompt if this is not the first render (does not update prompt if component unmounts and re-mounts) OR if this is the first turn (prevents blank prompt)
    if (!isFirstRender.current || totalTurns === 0) {
      if (totalTurns === 0) {
        setPrompt(
          <>{players[0].name}, roll the dice and then respond to the prompt!</>
        );
      } else if (activeSpace % 2 === 0) {
        // If promptsCopy array is empty, re-copy from original prompts array
        if (promptsCopy.current.length === 0) {
          promptsCopy.current = prompts.slice();
        }
        let randomIndex = Math.floor(
          Math.random() * promptsCopy.current.length
        );
        setPrompt(promptsCopy.current[randomIndex]);
        // Remove prompt from array
        promptsCopy.current.splice(randomIndex, 1);
      } else if (activeSpace % 4 === 1) {
        setPrompt(
          <>
            Ask someone a question
            <br />
            OR
            <br />
            Comment on any subject
          </>
        );
      } else if (activeSpace % 4 === 3) {
        // If feelings array is empty, re-populate
        feelings.current.length === 0 && initializeFeelings();
        let randomIndex = Math.floor(Math.random() * feelings.current.length);
        setPrompt(
          "Talk about a time that you felt " +
            feelings.current[randomIndex].toLowerCase() +
            "."
        );
        // Remove feeling from array
        feelings.current.splice(randomIndex, 1);
      }
    }
    // Sets isFirstRender to false
    isFirstRender.current = false;
  }, [totalTurns]);

  // Set prompt style
  let background = "";
  let backgroundImageURL = "";

  if (totalTurns === 0) {
    background = "White";
  } else if (activeSpace % 2 === 0) {
    background = "LightSkyBlue";
    backgroundImageURL = "src/assets/nature/water.svg";
  } else if (activeSpace % 4 === 1) {
    background = "LightGreen";
    backgroundImageURL = "src/assets/nature/tree.svg";
  } else if (activeSpace % 4 === 3) {
    background = "LightPink";
    backgroundImageURL = "src/assets/nature/volcano.svg";
  }

  return (
    <div
      className="prompt"
      style={{
        backgroundColor: background,
        backgroundImage: "url(" + backgroundImageURL + ")",
        backgroundRepeat: "repeat",
      }}
    >
      {prompt}
    </div>
  );
};

export default Prompt;
