import React, { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import Header from "./components/layout/Header";

import styles from "./App.module.css";
import Products from "./components/products/Products";

const App = () => {
  const drawerWidth = 240;
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            primary: {
              main: "#d90d76",
            },
            secondary: {
              main: "#d0ba00",
            },
            // background: {
            //   main: "#2e2e2e",
            //   // main: "f5f5f5",
            // },
          }
        : {
            primary: {
              main: "#d90d76",
            },
            secondary: {
              main: "#d0ba00",
            },
            background: {
              // main: "#2e2e2e",
              main: "f5f5f5",
            },
          }),
      action: {
        main: "#fff",
      },
    },
  });

  const toggleThemeHandler = (event) => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    // <div className={styles["App-header"]}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} onToggleTheme={toggleThemeHandler} />
      <Products drawerWidth={drawerWidth} />
    </ThemeProvider>
    // </div>
  );
};

export default App;
