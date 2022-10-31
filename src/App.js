import React, { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import Products from "./components/products/Products";

import styles from "./App.module.css";

const App = () => {
  const drawerWidth = 240;
  const [showLogin, setShowLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(firebaseApp);
  const authInstance = getAuth(firebaseApp);

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

  const showLoginHandler = (event) => {
    setShowLogin(true);
  };

  const closeLoginHandler = (event) => {
    setShowLogin(false);
  };

  const loginHandler = async (userCredentials) => {
    const user = await signInWithEmailAndPassword(
      authInstance,
      userCredentials.email,
      userCredentials.password
    );
    console.log(user.user);
  };

  return (
    // <div className={styles["App-header"]}>
    <AuthProvider sdk={authInstance}>
      <FirestoreProvider sdk={firestoreInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {showLogin && (
            <Login
              open={showLogin}
              drawerWidth={drawerWidth}
              onClose={closeLoginHandler}
              onLogin={loginHandler}
            />
          )}
          <Header
            drawerWidth={drawerWidth}
            onShowLogin={showLoginHandler}
            onToggleTheme={toggleThemeHandler}
          />
          <Products drawerWidth={drawerWidth} />
        </ThemeProvider>
      </FirestoreProvider>
    </AuthProvider>
    // </div>
  );
};

export default App;
