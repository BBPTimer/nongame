import { use } from "react";
import { GameContext } from "../contexts/GameContext";
import Play from "./Main/Play";
import Results from "./Main/Results";
import Setup from "./Main/Setup";

const Main = () => {
  const { isSetupComplete, isGameComplete } = use(GameContext);

  if (!isSetupComplete) {
    return <Setup />;
  } else if (isGameComplete) {
    return <Results />;
  } else {
    return <Play />;
  }
};

export default Main;
