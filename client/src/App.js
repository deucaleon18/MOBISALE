import React, { useEffect } from "react";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import Routing from "./Routing";
import Navbar from "./components /Navbar/Navbar";
import Footer from "./components /Footer/Footer";




const App = () => {

console.log(theme)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Navbar />

        <Routing />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
