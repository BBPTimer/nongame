import { useContext } from "react";
import { GameContext } from "../GameContext";
import Setup from "./Main/Setup";
import Play from "./Main/Play";

const Main = () => {
  const { isSetupComplete } = useContext(GameContext);

  return <>{isSetupComplete ? <Play /> : <Setup />}</>;
};

export default Main;
