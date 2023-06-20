import {
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import * as _ from "lodash";
import React from "react";
import { IFilterPost } from "../../interface/post";

interface IFilterPostForm {
  value: IFilterPost;
  handleChange: (value: IFilterPost) => void;
}

const FilterPostForm = (props: IFilterPostForm) => {
  const { value, handleChange } = props;

  const handleChangeQuery = _.debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newValue = { ...value, query: e.target.value };
      handleChange(newValue);
    },
    100
  );

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-end"
      gap="8px"
      mb={3}
      alignItems="center"
    >
      <Typography variant="body1">Filter:</Typography>
      <OutlinedInput
        onChange={handleChangeQuery}
        defaultValue={value.query}
        size="small"
      />
      <Typography variant="body1">By:</Typography>
      <Select
        value={value.by}
        onChange={(e) => handleChange({ ...value, by: e.target.value as any })}
        size="small"
      >
        <MenuItem value="userId">User ID</MenuItem>
        <MenuItem value="title">Title</MenuItem>
      </Select>
    </Box>
  );
};

export default FilterPostForm;
