import { styled, TextField } from "@mui/material";

export const CodeInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    textAlign: "center",
    maxWidth: "65px",
  },
}));
