import { createContext, useEffect, useState } from "react";
import Deck from "../classes/Deck";
import defaultData from "../defaultDecks.json";

export const DeckContext = createContext();

export const DeckContextProvider = ({ children }) => {
  // Default decks
  const [defaultDecks, setDefaultDecks] = useState([]);

  const loadDefaultDecks = () => {
    let decks = [];
    // Sort defaultData by deck name
    defaultData.sort((a, b) => a.deckName.localeCompare(b.deckName));
    defaultData.forEach((deck) => {
      let newDeck = new Deck(deck.id, deck.deckName, deck.prompts);
      decks.push(newDeck);
    });
    setDefaultDecks(decks);
    // Set default LS deck
    if (!localStorage.getItem("selectedDeck")) {
      localStorage.setItem("selectedDeck", decks[0].deckName);
    }
  };

  // Load default decks on page load
  useEffect(() => {
    loadDefaultDecks();
  }, []);

  const resetDeck = () => {
    localStorage.setItem("selectedDeck", defaultDecks[0].deckName);
  };

  return (
    <DeckContext.Provider
      value={{
        defaultDecks,
        resetDeck,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
