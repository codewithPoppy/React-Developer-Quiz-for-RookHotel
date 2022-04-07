import React from "react";

import { Typography, InputBase } from "@mui/material";

interface IMyTextField {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyTextField = (props: IMyTextField) => {
  const { label, value, onChange } = props;
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
          py: "2px",
        }}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default React.memo(MyTextField);
