import { BarChart } from "@mui/x-charts/BarChart";
import { use } from "react";
import { GameContext } from "../../../../contexts/GameContext";

const DiceStats = () => {
  const { rollHistory } = use(GameContext);
  let rollCount = [0, 0, 0, 0, 0, 0];

  // Count rolls
  for (let i = 0; i < 6; i++) {
    for (let roll of rollHistory.current) {
      if (roll === i + 1) {
        rollCount[i] += 1;
      }
    }
  }

  return (
    <div className="white-bg">
      <BarChart
        xAxis={[{ data: ["1", "2", "3", "4", "5", "6"] }]}
        series={[{ data: rollCount, color: "Coral" }]}
        barLabel={"value"}
        borderRadius={10}
        grid={{ horizontal: true }}
        height={200}
      />
    </div>
  );
};

export default DiceStats;
