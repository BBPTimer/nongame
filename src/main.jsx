import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DeckContextProvider } from "./contexts/DeckContext.jsx";
import { GameContextProvider } from "./contexts/GameContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameContextProvider>
      <DeckContextProvider>
        <App />
      </DeckContextProvider>
    </GameContextProvider>
  </StrictMode>
);
