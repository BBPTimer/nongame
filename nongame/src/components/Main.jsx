import { useContext } from "react";
import { GameContext } from "../GameContext";
import Play from "./Main/Play";
import Setup from "./Main/Setup";

const Main = () => {
  const { isSetupComplete } = useContext(GameContext);

  return <>{isSetupComplete ? <Play /> : <Setup />}</>;
};

export default Main;
