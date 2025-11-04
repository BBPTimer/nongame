import { useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { shuffle } from "./common/utils";
import CustomDeck from "./components/CustomDeck";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import Main from "./components/Main";
import { GameContext } from "./contexts/GameContext";

function App() {
  // Initialize state variables
  const [isNewGame, setIsNewGame] = useState(true);
  const [promptTypes, setPromptTypes] = useState({});
  const [players, setPlayers] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState();
  const [isGameComplete, setIsGameComplete] = useState();
  const [prompts, setPrompts] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [roll, setRoll] = useState(null);
  const [activeSpace, setActiveSpace] = useState(null);
  const [totalTurns, setTotalTurns] = useState(null);
  const [customDeck, setCustomDeck] = useState([]);
  const [customDeckName, setCustomDeckName] = useState("");

  const unusedPrompts = useRef([]);
  const feelings = useRef([]);
  const promptHistory = useRef([]);
  const rollHistory = useRef([]);

  // Initialize new game
  const initializeGame = () => {
    // Define Player class
    class Player {
      constructor(id, name, emoji) {
        this.id = id;
        this.isActive = false;
        this.name = name;
        this.emoji = emoji;
        this.sumOfRolls = 0;
        this.space = 0;
        this.laps = 0;
      }
    }

    // Define emojis
    const emojis = ["🐻", "🐲", "🦊", "🐸", "🦁", "🐵"];
    // Randomize emoji order
    shuffle(emojis);

    // Create empty array to store Player objects
    let playersArray = [];

    // Populate players array
    for (let i = 0; i < 6; i++) {
      playersArray.push(new Player(i + 1, "Player " + (i + 1), emojis[i]));
    }

    // Set Player 1 to active
    playersArray[0].isActive = true;

    // Initialize state variables with default values
    setIsNewGame(false);
    setPromptTypes({
      feelings: true,
      questionComment: true,
    });
    setPlayers(playersArray);
    setNumberOfPlayers(1);
    setIsSetupComplete(false);
    setIsGameComplete(false);
    setPrompts([]);
    setPrompt("");
    setRoll(1);
    setActiveSpace(0);
    setTotalTurns(0);
    // Set state customDeck to LS value
    if (localStorage.getItem("customDeck")) {
      // Parse LS JSON string back into array
      setCustomDeck(JSON.parse(localStorage.getItem("customDeck")));
    }
    // Set state customDeckName to LS value or "My Deck" if no LS value
    setCustomDeckName(localStorage.getItem("customDeckName") || "My Deck");
    // Set LS customDeckName to "My Deck" if no LS value
    if (!localStorage.getItem("customDeckName")) {
      localStorage.setItem("customDeckName", "My Deck");
    }

    // Reset prompt history
    promptHistory.current = [
      {
        promptType: "Prompt Deck",
        count: 0,
      },
      {
        promptType: "Question or\n Comment",
        count: 0,
      },
      {
        promptType: "Emotion",
        count: 0,
      },
    ];

    // Reset roll history
    rollHistory.current = [
      {
        diceValue: "One",
        count: 0,
      },
      {
        diceValue: "Two",
        count: 0,
      },
      {
        diceValue: "Three",
        count: 0,
      },
      {
        diceValue: "Four",
        count: 0,
      },
      {
        diceValue: "Five",
        count: 0,
      },
      {
        diceValue: "Six",
        count: 0,
      },
    ];
  };

  // Call newGame function if isNewGame is true
  isNewGame && initializeGame();

  return (
    <GameContext.Provider
      value={{
        isNewGame,
        setIsNewGame,
        promptTypes,
        setPromptTypes,
        players,
        setPlayers,
        numberOfPlayers,
        setNumberOfPlayers,
        isSetupComplete,
        setIsSetupComplete,
        isGameComplete,
        setIsGameComplete,
        prompts,
        setPrompts,
        prompt,
        setPrompt,
        roll,
        setRoll,
        activeSpace,
        setActiveSpace,
        totalTurns,
        setTotalTurns,
        customDeck,
        setCustomDeck,
        customDeckName,
        setCustomDeckName,
        unusedPrompts,
        feelings,
        promptHistory,
        rollHistory,
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/custom" element={<CustomDeck />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Router>
      <br />
      <footer className="white-bg gray-hover">
        &copy; {new Date().getFullYear()} Greg Weseloh LLC
      </footer>
    </GameContext.Provider>
  );
}

export default App;
