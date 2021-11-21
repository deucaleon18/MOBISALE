
import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#060322",
      light: "#0085f1",
    },
    secondary: {
      main: "#0085f1",
    },
    error: {
      main: "#c10000",
    },
    background: {
      default: "#060322",
      paper: "#252953",
    },
    divider: "rgba(255,255,255,0.12)",
    text: {
      secondary: "#0085F1",
    },
  },
  typography: {
    fontWeightLight: 500,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  },
  
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
