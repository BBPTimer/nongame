import { BarChart } from "@mui/x-charts/BarChart";

const Graph = (props) => {
  const { data, keyName } = props;

  return (
    <div className="white-bg">
      <BarChart
        dataset={data}
        xAxis={[{ dataKey: keyName }]}
        series={[{ dataKey: "count", color: "Coral" }]}
        barLabel={"value"}
        borderRadius={10}
        grid={{ horizontal: true }}
        height={200}
      />
    </div>
  );
};

export default Graph;
