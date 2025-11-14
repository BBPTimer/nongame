import { use, useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import CustomDeck from "./components/CustomDeck";
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import Main from "./components/Main";
import { GameContext } from "./contexts/GameContext";

function App() {
  const { isNewGame, initializeGame } = use(GameContext);

  // Call newGame function if isNewGame is true
  useEffect(() => {
    isNewGame && initializeGame();
  }, [isNewGame]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/custom" element={<CustomDeck />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <br />
      <footer className="white-bg gray-hover">
        &copy; {new Date().getFullYear()} Greg Weseloh LLC
      </footer>
    </>
  );
}

export default App;
