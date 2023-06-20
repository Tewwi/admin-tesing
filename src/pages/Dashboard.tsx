import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { chartOption, routerPath } from "../contanst";
import LineChart from "../components/dashboard/LineChartComp";
import ColumnChart from "../components/dashboard/ColumnChart";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChangeChart = (text: string) => {
    navigate(`../${routerPath.DASHBOARD}/${text}`, { replace: true });
  };

  return (
    <Container sx={{ py: "16px" }}>
      <Typography variant="h5" sx={{ color: "primary.main" }}>
        Dash Board
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "18px",
          gap: "24px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          {Object.values(chartOption).map((label: string) => {
            return (
              <Button
                variant="outlined"
                key={label}
                sx={{
                  textTransform: "capitalize",
                }}
                color={pathname.includes(label) ? "primary" : "inherit"}
                onClick={() => handleChangeChart(label)}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        <LineChart display={pathname.includes(chartOption.SUBCRIPTION)} />
        <ColumnChart display={pathname.includes(chartOption.REVENUE)} />
      </Box>
    </Container>
  );
};

export default Dashboard;
