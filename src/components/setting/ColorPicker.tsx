import { Box } from "@mui/material";
import React from "react";
import { ChromePicker } from "react-color";

interface Props {
  openColorPicker: boolean;
  handleClose: () => void;
  handleChangeColor: (color: string) => void;
  color: string;
}

const ColorPicker = (props: Props) => {
  const { openColorPicker, handleClose, handleChangeColor, color } = props;
  return (
    <Box display={openColorPicker ? "block" : "none"}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}
        onClick={handleClose}
      />
      <ChromePicker
        color={color}
        onChangeComplete={(color) => {
          handleChangeColor(color.hex);
        }}
        styles={{
          default: { picker: { zIndex: 2, position: "relative" } },
        }}
      />
    </Box>
  );
};

export default ColorPicker;
