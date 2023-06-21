import { Box, Container, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ColorPicker from "../components/setting/ColorPicker";
import DateRangeForm from "../components/setting/FomrControl/DateRangeForm";
import TextFieldForm from "../components/setting/FomrControl/TextFieldForm";
import { patternEmail } from "../contanst";

interface ISettingForm {
  title: string;
  email: string;
  backgroundColor: string;
  activeDate: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const Setting = () => {
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty },
    reset,
    clearErrors,
  } = useForm<ISettingForm>({
    defaultValues: {
      title: "",
      email: "",
      backgroundColor: "",
      activeDate: {
        startDate: new Date(),
        endDate: new Date(),
      },
    },
  });
  const dateValue = watch("activeDate");

  const onSubmit = (value: ISettingForm) => {
    reset(value);
    console.log(value);
  };

  return (
    <Container sx={{ py: "16px" }}>
      <Typography variant="h5" sx={{ color: "primary.main", mb: 4 }}>
        Setting
      </Typography>

      <Box
        px={16}
        display="flex"
        justifyContent="flex-end"
        onClick={handleSubmit(onSubmit)}
      >
        <Button disabled={!isDirty} variant="contained">
          Save
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" my={4} justifyContent="space-evenly">
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" sx={{ color: "primary.main", mb: 1 }}>
            Title:
          </Typography>
          <TextFieldForm
            control={control}
            name="title"
            rules={{
              required: { value: true, message: "Please fill this field" },
            }}
            size="medium"
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="body1" sx={{ color: "primary.main", mb: 1 }}>
            Email:
          </Typography>
          <TextFieldForm
            control={control}
            name="email"
            rules={{
              required: { value: true, message: "Please fill this field" },
              pattern: {
                value: patternEmail,
                message: "Invalid email address",
              },
            }}
            size="medium"
          />
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" my={4} justifyContent="space-evenly">
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" sx={{ color: "primary.main", mb: 1 }}>
            Background Color:
          </Typography>
          <TextFieldForm
            control={control}
            name="backgroundColor"
            rules={{
              required: { value: true, message: "Please fill this field" },
            }}
            size="medium"
            sx={{ paddingRight: "4px", maxWidth: "223px" }}
            endAdornment={
              <Box
                onClick={() => setOpenColorPicker(true)}
                sx={{
                  bgcolor: watch("backgroundColor") || "ActiveBorder",
                  height: "90%",
                  width: "50px",
                  borderRadius: "4px",
                }}
              />
            }
          />

          <ColorPicker
            color={watch("backgroundColor")}
            openColorPicker={openColorPicker}
            handleChangeColor={(color) => {
              setValue("backgroundColor", color);
              clearErrors("backgroundColor");
            }}
            handleClose={() => setOpenColorPicker(false)}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="body1" sx={{ color: "primary.main", mb: 1 }}>
            Active Date:
          </Typography>
          <DateRangeForm
            startDate={dateValue.startDate}
            endDate={dateValue.endDate}
            onChange={(date) => {
              setValue("activeDate", {
                startDate: date[0],
                endDate: date[1],
              });
            }}
            control={control}
            name="activeDate"
            rules={{
              validate: {
                value: (value: any) => {
                  if (Object.values(value)?.includes(null)) {
                    return "Please fill all this field";
                  }
                },
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Setting;
