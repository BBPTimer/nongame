import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../GameContext";
import Modal from "../common/Modal";
import PlayerForms from "./Setup/PlayerForms";
import NewGameButton from "../common/NewGameButton";
import { shuffle } from "../../common/utils";

const Setup = () => {
  const {
    players,
    setPlayers,
    numberOfPlayers,
    setNumberOfPlayers,
    setIsSetupComplete,
    customDeck,
    customDeckName,
  } = useContext(GameContext);

  // useState to re-render Modal component when deck changes
  const [promptModalText, setPromptModalText] = useState("");

  // Function to get modal content
  const getPromptModalText = () => {
    // If user chose custom deck, setModalContent with customDeck array
    if (localStorage.getItem("deck") === customDeckName) {
      setPromptModalText(
        customDeck.map((prompt) => prompt.promptText).join("\n")
      );
      // Otherwise fetch deck
    } else {
      fetch("/decks/" + localStorage.getItem("deck") + ".txt")
        .then((response) => response.text())
        .then((data) => setPromptModalText(data));
    }
  };

  // Get modal content upon first render
  useEffect(getPromptModalText, []);

  const handleDeckChange = (event) => {
    // Save deck to local storage
    localStorage.setItem("deck", event.target.value);
    // Get modal content when deck option changes
    getPromptModalText();
  };

  const handleNumberOfPlayersChange = (event) => {
    // Update number of players state
    setNumberOfPlayers(event.target.value);

    // Update players array with active players
    setPlayers(
      players.map((player) =>
        player.id - 1 < event.target.value
          ? { ...player, isActive: true }
          : { ...player, isActive: false, name: "Player " + player.id }
      )
    );
  };

  // Render deck option divs
  let deckOptions = [
    "All Ages (Deep)",
    "All Ages (Lighthearted)",
    "Families (Deep)",
    "Families (Lighthearted)",
    "Kids (Deep)",
    "Kids (Lighthearted)",
    "Seniors  (Lighthearted)",
    "Seniors (Deep)",
    "Teens  (Lighthearted)",
    "Teens (Deep)",
    "Veterans",
  ];

  const deckOptionDivs = deckOptions.map((deckOption, index) => (
    <option key={index} value={deckOption}>
      {deckOption}
    </option>
  ));

  // Render number of player options
  const numberOfPlayerOptions = [];
  for (let i = 1; i <= 6; i++) {
    numberOfPlayerOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    // Pass only active players to Play component, and shuffle the array
    setPlayers(shuffle(players.filter((player) => player.isActive)));

    setIsSetupComplete(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Game Setup</h1>{" "}
        <Modal
          modalContent={
            <>
              <p>
                Welcome to The Nongame, a communication game! "Compete" to
                complete laps around the board by answering prompts.
              </p>
              <p>
                The game begins with this Setup form. First, choose which
                prompts you would like to appear in the game. Next, select your
                number of players, and type in their names! Click the Play!
                button to begin the game.
              </p>
              <p>
                <i>
                  Tip: if you have more than 6 players, we recommend choosing 1
                  player and competing as a group to complete laps around the
                  board.
                </i>
              </p>
              <p>
                The first player will begin the game by clicking the dice. That
                player's emoji pawn moves to the appropriate space, and a prompt
                appears in the center of the board. Other players should remain
                quiet when a player responds to a prompt! After a player
                responds, the next player rolls the dice, and play continues.
              </p>
              <p>
                As players make their way around the board, each player's lap
                counter will increase. 45 minutes to 1 hour makes for a great
                game length. See which player completes the most laps by the end
                of the game!
              </p>
            </>
          }
        />
        <div className="white-bg gray-hover">
          <label htmlFor="deck">Prompt deck: </label>
          <select
            name="deck"
            onChange={handleDeckChange}
            defaultValue={localStorage.getItem("deck")}
            required
          >
            {deckOptionDivs}
            {customDeck.length > 0 && (
              <option value={customDeckName}>{customDeckName}</option>
            )}
          </select>{" "}
          <Modal modalContent={promptModalText} />
        </div>
        <br />
        <div className="white-bg gray-hover">
          <label htmlFor="numberOfPlayers"># of players: </label>
          <select
            name="numberOfPlayers"
            onChange={handleNumberOfPlayersChange}
            value={numberOfPlayers}
            required
          >
            {numberOfPlayerOptions}
          </select>
        </div>
        <br />
        <div id="player-forms" className="white-bg gray-hover">
          <PlayerForms />
        </div>
        <br />
        <NewGameButton buttonText={"Reset"} />
        <button className="shake">Play!</button>
      </form>
    </>
  );
};

export default Setup;
