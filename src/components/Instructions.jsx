const Instructions = () => {
  return (
    <>
      <h1>How to Play</h1>
      <div id="instructions" className="white-bg">
        <p>
          Welcome to The Nongame!, a conversation game! Players "compete" to
          complete laps around the board by answering prompts. The Nongame! is
          great for:
        </p>
        <ul>
          <li>Therapy groups</li>
          <li>School classes</li>
          <li>Retirement home activities</li>
          <li>Family game night</li>
          <li>Youth groups</li>
          <li>
            Any gathering where people want to get to know each other better!
          </li>
        </ul>
        <p>
          The game begins with the Setup form. First, choose which prompts you
          would like to appear in the game. Select a prompt deck category (All
          Ages, Families, Kids, Teens or Seniors) and depth (Lighthearted or
          Deep). Lighthearted prompts make great icebreakers, while deep prompts
          promote serious discussion. Click the info icon to preview prompts
          from the selected deck.
        </p>
        <p>
          Next, select your number of players, and type in their names! The game
          supports 2-6 players. If you have more than 6 players, we recommend
          choosing 1 player and competing as a group to complete laps around the
          board. Click the Play! button to begin the game.
        </p>
        <p>
          Player order is selected randomly. The first player will begin the
          game by clicking the dice. That player's emoji pawn moves to the
          appropriate space, and a prompt appears in the center of the board.
          Prompts fall into 3 categories:
        </p>
        <ol>
          <li>
            <span
              className="material-symbols-outlined"
              style={{ color: "LightSkyBlue" }}
            >
              playing_cards
            </span>
            : A random prompt is displayed from the previously-selected prompt
            deck.
          </li>
          <br />
          <li>
            <span
              className="material-symbols-outlined"
              style={{ color: "LightGreen" }}
            >
              question_exchange
            </span>
            : Ask someone a question OR comment on any subject. This gives
            players an opportunity to engage with each other and discuss
            whatever's on the mind!
          </li>
          <br />
          <li>
            <span
              className="material-symbols-outlined"
              style={{ color: "LightPink" }}
            >
              comedy_mask
            </span>
            : Players will talk about a time when they felt a certain emotion.
          </li>
        </ol>
        <p>
          Other players should remain quiet when a player responds to a prompt!
          After a player responds, the next player rolls the dice, and play
          continues.
        </p>
        <p>
          As players make their way around the board, each player's lap counter
          will increase. 45 minutes to 1 hour makes for a great game length. See
          which player completes the most laps by the end of the game, and have
          fun!
        </p>
      </div>
      <h1>
        <a
          id="issues"
          href="https://github.com/BBPTimer/nongame/issues"
          target="top"
        >
          Issues or feature requests?
        </a>
      </h1>
      <div id="low-res">
        <br />
        The Nongame! plays best on displays greater than 375 pixels wide.
        <br />
      </div>
      <div id="four-k">
        <br />
        Nice monitor!
        <br />
      </div>
      <div id="eight-k">
        <br />
        Seriously, nice monitor!
        <br />
      </div>
    </>
  );
};

export default Instructions;
