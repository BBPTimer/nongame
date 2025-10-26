import { createContext, useEffect, useState } from "react";
import Deck from "../components/classes/Deck";
import defaultData from "../defaultDecks.json";

export const DeckContext = createContext();

export const DeckContextProvider = ({ children }) => {
  // Default decks
  const [defaultDecks, setDefaultDecks] = useState([]);

  const loadDefaultDecks = () => {
    let decks = [];
    defaultData.forEach((deck) => {
      let newDeck = new Deck(deck.id, deck.deckName, deck.prompts);
      decks.push(newDeck);
    });
    setDefaultDecks(decks);
  };

  // Load default decks on page load
  useEffect(() => {
    loadDefaultDecks();
  }, []);

  return (
    <DeckContext.Provider
      value={{
        defaultDecks,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
