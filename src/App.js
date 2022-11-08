import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import LoginPage from "./pages/Login";
import ProductsPage from "./pages/ProductsPage";

import Header from "./components/layout/Header";
import ErrorBoundary from "./components/error/ErrorBoundary";

const App = () => {
  const drawerWidth = 240;
  const history = useHistory();
  const [darkMode, setDarkMode] = useState(true);
  // const [showLogin, setShowLogin] = useState(false);

  const firebaseApp = useFirebaseApp();
  const authInstance = getAuth(firebaseApp);
  const firestoreInstance = getFirestore(firebaseApp);

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

  // const showLoginHandler = (event) => {
  //   setShowLogin(true);
  // };

  // const closeLoginHandler = (event) => {
  //   setShowLogin(false);
  // };

  const logoutHandler = async (event) => {
    await signOut(authInstance);
    history.push("/login");
  };

  return (
    // <div className={styles["App-header"]}>
    <ErrorBoundary>
      <AuthProvider sdk={authInstance}>
        <FirestoreProvider sdk={firestoreInstance}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Switch>
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>
              <Route path="/home" exact>
                <Header
                  drawerWidth={drawerWidth}
                  onLogout={logoutHandler}
                  onToggleTheme={toggleThemeHandler}
                />
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/products" exact>
                <Header
                  drawerWidth={drawerWidth}
                  onLogout={logoutHandler}
                  onToggleTheme={toggleThemeHandler}
                />
                <ProductsPage drawerWidth={drawerWidth} />
              </Route>
            </Switch>
          </ThemeProvider>
        </FirestoreProvider>
      </AuthProvider>
    </ErrorBoundary>
    // </div>
  );
};

export default App;
