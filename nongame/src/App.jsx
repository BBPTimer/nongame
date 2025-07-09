import { useState } from "react";
import { GameContext } from "./GameContext";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Instructions from "./components/Instructions";
import shuffle from "./common/utils";

function App() {
  const [isNewGame, setIsNewGame] = useState(true);
  const [players, setPlayers] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState();
  const [questions, setQuestions] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [roll, setRoll] = useState(null);
  const [activeSpace, setActiveSpace] = useState(null);
  const [totalTurns, setTotalTurns] = useState(null);

  const initializeGame = () => {
    // Set up players
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

    const emojis = ["🐻", "🐲", "🦊", "🐸", "🦁", "🐵"];
    shuffle(emojis);

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
    setQuestions([]);
    setPrompt("");
    setRoll(1);
    setActiveSpace(0);
    setTotalTurns(0);
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
        questions,
        setQuestions,
        prompt,
        setPrompt,
        roll,
        setRoll,
        activeSpace,
        setActiveSpace,
        totalTurns,
        setTotalTurns,
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/instructions" element={<Instructions />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Router>
      <footer>&copy; {new Date().getFullYear()} Greg Weseloh</footer>
    </GameContext.Provider>
  );
}

export default App;
