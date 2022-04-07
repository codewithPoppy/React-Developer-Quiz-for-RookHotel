import React from "react";

import { Box, Typography, Container } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import MyTextArea from "./MyTextArea";
import MyTextField from "./MyTextField";

const PixelPerfectForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [visaStatus, setVisaStatus] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [studyArea, setStudyArea] = React.useState("");
  const [dateValue, setDateValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
  };
  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: "#1779db",
            color: "white",
            width: "480px",
            py: "20px",
            px: "25px",
            mt: 5,
          }}
        >
          <Box>
            <MyTextField
              label="Your full given name:"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 4, display: "flex" }}>
            <Box sx={{ width: "40%" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Date of Birth"
                  inputFormat="MM/dd/yyyy"
                  value={dateValue}
                  onChange={handleChange}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <>
                      <Typography
                        sx={{ fontFamily: "Lato", fontStyle: "italic" }}
                      >
                        Date of Birth
                      </Typography>
                      <input
                        style={{
                          border: "1px solid white",
                          fontSize: "1rem",
                          width: "100%",
                          boxSizing: "border-box",
                          color: "white",
                          fontFamily: "Lato",
                          paddingLeft: "32px",
                          paddingRight: "12px",
                          marginTop: "5px",
                          paddingTop: "8px",
                          paddingBottom: "9px",
                          backgroundColor: "transparent",
                          outline: "none",
                          backgroundImage: "url('/calendar.svg')",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "25px 25px",
                          backgroundPosition: "5px 5px",
                        }}
                        ref={inputRef}
                        {...inputProps}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <MyTextField
                label=" Country of residence or citizenship:"
                value={visaStatus}
                onChange={(e) => setVisaStatus(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <MyTextField
              label="What school do you plan to attend"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <MyTextArea
              label="Please take a moment to describe your intended area of study:"
              placeholder="Enter details here"
              value={studyArea}
              onChange={(e) => setStudyArea(e.target.value)}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default React.memo(PixelPerfectForm);
