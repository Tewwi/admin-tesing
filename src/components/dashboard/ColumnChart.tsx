import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "#56d785de",
  "#89bbefde",
  "#dbcd5fde",
  "#aa49d9de",
  "#f54a40de",
];

const data = [
  {
    name: "Jan",
    tempData: 13,
  },
  {
    name: "Feb",
    tempData: 11,
  },
  {
    name: "Mar",
    tempData: 15,
  },
  {
    name: "Apr",
    tempData: 12,
  },
  {
    name: "May",
    tempData: 14,
  },
  {
    name: "Jun",
    tempData: 16,
  },
  {
    name: "Jul",
    tempData: 18,
  },
  {
    name: "Aug",
    tempData: 17,
  },
  {
    name: "Sep",
    tempData: 14,
  },
  {
    name: "Oct",
    tempData: 20,
  },
  {
    name: "Nov",
    tempData: 15,
  },
  {
    name: "Dec",
    tempData: 18,
  },
];

interface Props {
  display: boolean;
}

const ColumnChart = (props: Props) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ display: props.display ? "block" : "none" }}>
      <Typography variant="h6" color="initial" m={2}>
        Revenue of each month in year
      </Typography>
      <BarChart
        width={isMobile ? 500 : 800}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="tempData" fill="#8884d8" label={{ position: "top" }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </Box>
  );
};

export default ColumnChart;
