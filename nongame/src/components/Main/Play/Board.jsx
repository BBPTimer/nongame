import Spaces from "./Board/Spaces";
import Prompt from "./Board/Prompt";

const Board = () => {
  return (
    <div className="board">
      <Spaces />
      <div className="space16">
        <Prompt />
      </div>
    </div>
  );
};

export default Board;
