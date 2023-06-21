import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Mon",
    "Week1-Jun": 22,
    "Week2-Jun": 13,
  },
  {
    name: "Tue",
    "Week1-Jun": 19,
    "Week2-Jun": 11,
  },
  {
    name: "Wed",
    "Week1-Jun": 20,
    "Week2-Jun": 15,
  },
  {
    name: "Thu",
    "Week1-Jun": 25,
    "Week2-Jun": 12,
  },
  {
    name: "Fri",
    "Week1-Jun": 24,
    "Week2-Jun": 14,
  },
  {
    name: "Sat",
    "Week1-Jun": 26,
    "Week2-Jun": 16,
  },
  {
    name: "Sun",
    "Week1-Jun": 28,
    "Week2-Jun": 18,
  },
];

interface ILineChartCompProps {
  display: boolean;
}

const LineChartComp = (props: ILineChartCompProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ display: props.display ? "block" : "none" }}>
      <Typography variant="h6" color="initial" m={2}>
        Number of subscribers by week
      </Typography>
      <LineChart
        width={isMobile ? 500 : 800}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ top: "-20px", left: "40%" }} />
        <Line type="monotone" dataKey="Week1-Jun" stroke="#373839de">
          <LabelList
            content={(props) => {
              const { x, y, ...rest } = props;

              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    fontSize={10}
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                  >
                    {rest.value}
                  </text>
                </g>
              );
            }}
          />
        </Line>
        <Line type="monotone" dataKey="Week2-Jun" stroke="#76c9fbde">
          <LabelList
            content={(props) => {
              const { x, y, stroke, value } = props;

              return (
                <text
                  x={x}
                  y={y}
                  dy={-4}
                  fill={stroke}
                  fontSize={10}
                  textAnchor="middle"
                >
                  {value}
                </text>
              );
            }}
          />
        </Line>
      </LineChart>
    </Box>
  );
};

export default LineChartComp;
