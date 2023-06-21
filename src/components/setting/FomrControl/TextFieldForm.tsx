import { OutlinedInput, OutlinedInputProps, Typography } from "@mui/material";
import { Control, RegisterOptions, useController } from "react-hook-form";

type Props = OutlinedInputProps & {
  name: string;
  clearIcon?: boolean;
  clearIconHasValue?: boolean;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

const TextFieldForm = (props: Props) => {
  const { control, name, rules, ...rest } = props;
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <>
      <OutlinedInput
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        error={!!error}
        {...rest}
      />
      <Typography
        variant="body2"
        sx={{
          color: "palette.error.main",
          display: !!error ? "block" : "none",
        }}
      >
        {error?.message || ""}
      </Typography>
    </>
  );
};

export default TextFieldForm;
