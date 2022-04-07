import React from "react";

import { Typography, InputBase } from "@mui/material";

interface IMyTextArea {
  label: string;
  placeholder: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyTextArea = (props: IMyTextArea) => {
  const { label, placeholder, value, onChange } = props;
  return (
    <>
      <Typography sx={{ fontFamily: "Lato", fontStyle: "italic" }}>
        {label}
      </Typography>
      <InputBase
        sx={{
          border: "1px solid white",
          width: "100%",
          color: "white",
          fontFamily: "Lato",
          px: "12px",
          mt: "5px",
          py: "8px",
        }}
        placeholder={placeholder}
        rows={6}
        multiline
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default React.memo(MyTextArea);
