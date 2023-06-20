import { Box, Container, MenuItem, MenuList, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { routerPath } from "../../contanst";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChangeChart = (url: string) => {
    navigate(`${url}`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "none !important",
      }}
    >
      <Box>
        <MenuList
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "24px 4px 24px 0px",
            borderRight: "2px solid black",
          }}
        >
          {Object.values(routerPath).map((name: string) => {
            return (
              <MenuItem
                sx={{
                  padding: "10px",
                  borderBottom: "1px solid black",
                  textTransform: "capitalize",
                }}
                key={name}
                onClick={() => handleChangeChart(name)}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "end",
                    color: pathname.includes(name)
                      ? "primary.main"
                      : "MenuText",
                  }}
                  variant="h6"
                >
                  {name.replace("_", " ")}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Box>

      <Box sx={{ flex: 1 }}>{props.children}</Box>
    </Container>
  );
};

export default Layout;
