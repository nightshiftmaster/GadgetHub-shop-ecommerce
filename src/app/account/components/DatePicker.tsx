import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Form, FormikHelpers, FormikProps } from "formik";

export default function DatePickerValue({
  name,
  setFieldValue,
}: {
  name: string;
  setFieldValue: FormikHelpers<any>["setFieldValue"];
}) {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={name}
          name={name}
          value={value}
          onChange={(newValue) => {
            setFieldValue("dateOfBirth", newValue?.format("YYYY-MM-DD"));
          }}
          className="w-full"
          slotProps={{ textField: { size: "medium" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#89CFF0",

                color: "black",
                borderRadius: "6px",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "blue",
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
