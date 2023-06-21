import { OutlinedInput } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDateRangeFormProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (date: [Date | null, Date | null]) => void;
}

const DateRangeForm = (props: IDateRangeFormProps) => {
  const { startDate, endDate, onChange } = props;

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      customInput={<OutlinedInput />}
    />
  );
};

export default DateRangeForm;
