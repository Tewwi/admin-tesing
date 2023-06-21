import { OutlinedInput, Typography } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Controller,
  RegisterOptions,
  Control,
  useController,
} from "react-hook-form";

interface IDateRangeFormProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (date: [Date | null, Date | null]) => void;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  name: string;
}

const DateRangeForm = (props: IDateRangeFormProps) => {
  const { startDate, endDate, onChange, name, control, rules } = props;
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={() => (
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={<OutlinedInput error={!!error} />}
          />
        )}
      />
      <Typography variant="body2" color={"red"}>
        {error?.message || ""}
      </Typography>
    </>
  );
};

export default DateRangeForm;
