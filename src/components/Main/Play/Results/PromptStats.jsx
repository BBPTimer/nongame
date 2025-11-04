import { BarChart } from "@mui/x-charts/BarChart";
import { use } from "react";
import { GameContext } from "../../../../contexts/GameContext";

const PromptStats = () => {
  const { promptHistory } = use(GameContext);

  return (
    <div className="white-bg">
      <BarChart
        dataset={promptHistory.current}
        xAxis={[{ dataKey: "promptType" }]}
        series={[
          { dataKey: "count", color: "Coral" },
        ]}
        barLabel={"value"}
        borderRadius={10}
        grid={{ horizontal: true }}
        height={200}
      />
    </div>
  );
};

export default PromptStats;
