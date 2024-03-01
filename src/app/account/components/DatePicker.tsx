import * as React from "react";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {FormikHelpers} from "formik";

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
            void setFieldValue("dateOfBirth", newValue?.format("YYYY-MM-DD"));
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
              fontSize: "1rem",
            },
            "@media (maxWidth: '300px')": {
              backgroundColor: "red",
            },
            backgroundColor: "#fff",
            "@media (max-width: 1300px)": {
              "& .MuiOutlinedInput-root": {
                fontSize: "0.9rem", // Adjusted font size for small screens
              },
            },
            "@media (max-width: 800px)": {
              "& .MuiOutlinedInput-root": {
                fontSize: "0.9rem", // Adjusted font size for small screens
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
