import { memo } from "react";

import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  height: number;
  open: boolean;
}

const Loading = (props: LoaderProps) => {
  const { height, open } = props;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <div
        style={{
          height: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CircularProgress style={{ color: "#fb8c00" }} />
      </div>
    </Backdrop>
  );
};

export default memo(Loading);
