"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#97AFDE",
    },
    secondary: {
      main: "#8313B2",
    },
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          boxShadow: "none !important",
          borderRadius: "8px",
          padding: "12px 16px !important",
          height: "48px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: "48px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            height: "48px",
            padding: "0 14px",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          },
          borderColor: "#A0A0A0",
          "& fieldset": {
            borderColor: "#A0A0A0",
          },
          "& .MuiSelect-select": {
            minHeight: "48px",
          },
          borderRadius: "8px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "48px",
          fontSize: "14px",
        },
      },
    },
  },
});
