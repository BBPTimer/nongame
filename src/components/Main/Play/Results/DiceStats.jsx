import { createTheme, ThemeProvider } from "@mui/material";
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

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Gill Sans",
        "Gill Sans MT",
        "Calibri",
        "Trebuchet MS",
        "sans-serif",
      ].join(","),
      fontWeightRegular: 100,
    },
  });

  return (
    <div className="white-bg">
      <ThemeProvider theme={theme}>
        <BarChart
          xAxis={[{ data: ["One", "Two", "Three", "Four", "Five", "Six"] }]}
          series={[{ data: rollCount, color: "Coral" }]}
          barLabel={"value"}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={200}
        />
      </ThemeProvider>
    </div>
  );
};

export default DiceStats;
