import { useContext } from "react";
import { GameContext } from "../GameContext";
import Setup from "./Main/Setup";
import Play from "./Main/Play";
import Results from "./Main/Results";

const Main = () => {
  const { isSetupComplete, isGameComplete } = useContext(GameContext);

  if (!isSetupComplete) {
    return <Setup />;
  } else if (isGameComplete) {
    return <Results />;
  } else {
    return <Play />;
  }
};

export default Main;
