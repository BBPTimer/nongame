import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { GameContext } from "./GameContext";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Instructions from "./components/Instructions";
import CustomDeck from "./components/CustomDeck";
import { shuffle, resetDeck } from "./common/utils";

function App() {
  // Initialize state variables
  const [isNewGame, setIsNewGame] = useState(true);
  const [players, setPlayers] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState();
  const [prompts, setPrompts] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [roll, setRoll] = useState(null);
  const [activeSpace, setActiveSpace] = useState(null);
  const [totalTurns, setTotalTurns] = useState(null);
  const [customDeck, setCustomDeck] = useState([]);
  const [customDeckName, setCustomDeckName] = useState("");

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
    setPlayers(playersArray);
    setNumberOfPlayers(1);
    setIsSetupComplete(false);
    // Set default LS deck
    if (!localStorage.getItem("deck")) {
      resetDeck();
    }
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
    // Set state customDeckName to LS value or "Custom Deck" if no LS value
    setCustomDeckName(localStorage.getItem("customDeckName") || "Custom Deck");
    // Set LS customDeckName to "Custom Deck" if no LS value
    if (!localStorage.getItem("customDeckName")) {
      localStorage.setItem("customDeckName", "Custom Deck");
    }
  };

  // Call newGame function if isNewGame is true
  isNewGame && initializeGame();

  return (
    <GameContext.Provider
      value={{
        isNewGame,
        setIsNewGame,
        players,
        setPlayers,
        numberOfPlayers,
        setNumberOfPlayers,
        isSetupComplete,
        setIsSetupComplete,
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
      <footer>&copy; {new Date().getFullYear()} Greg Weseloh</footer>
    </GameContext.Provider>
  );
}

export default App;
