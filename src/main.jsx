import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DeckContextProvider } from "./contexts/DeckContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DeckContextProvider>
      {" "}
      <App />
    </DeckContextProvider>
  </StrictMode>
);
