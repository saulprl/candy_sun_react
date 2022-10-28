import React, { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

import Header from "./components/layout/Header";
import Products from "./components/products/Products";

import styles from "./App.module.css";

const App = () => {
  const drawerWidth = 240;
  const [darkMode, setDarkMode] = useState(true);
  const firestoreInstance = getFirestore(useFirebaseApp());

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
    <FirestoreProvider sdk={firestoreInstance}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} onToggleTheme={toggleThemeHandler} />
        <Products drawerWidth={drawerWidth} />
      </ThemeProvider>
    </FirestoreProvider>
    // </div>
  );
};

export default App;
