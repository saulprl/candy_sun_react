import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectThemeMode } from "./store/uiSlice";

import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";

import LoginPage from "./pages/auth/Login";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductsPage from "./pages/products/ProductsPage";
import EmployeesPage from "./pages/employees/EmployeesPage";
import SalesPage from "./pages/sales/SalesPage";

import Header from "./components/layout/Header";
import MainContent from "./components/ui/MainContent";
import ErrorBoundary from "./components/error/ErrorBoundary";
import PrivateRoute from "./components/auth/PrivateRoute";
import SaleDialog from "./components/ui/SaleDialog";
import FiltersPage from "./pages/filters/FiltersPage";

const App = () => {
  const drawerWidth = 240;
  const history = useHistory();
  const themeMode = useSelector(selectThemeMode);
  setDefaultOptions({ locale: es });
  // const [showLogin, setShowLogin] = useState(false);

  const firebaseApp = useFirebaseApp();
  const authInstance = getAuth(firebaseApp);
  const firestoreInstance = getFirestore(firebaseApp);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "dark"
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

  // const toggleThemeHandler = (event) => {
  //   setDarkMode((prevState) => !prevState);
  // };

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider sdk={authInstance}>
          <FirestoreProvider sdk={firestoreInstance}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/home" />
                </Route>
                <PrivateRoute path="/home" exact>
                  <Header drawerWidth={drawerWidth} onLogout={logoutHandler} />
                  <MainContent drawerWidth={drawerWidth}>
                    <DashboardPage drawerWidth={drawerWidth} />
                  </MainContent>
                </PrivateRoute>
                <Route path="/login" exact>
                  <LoginPage />
                </Route>
                <PrivateRoute path="/filters">
                  <Header drawerWidth={drawerWidth} onLogout={logoutHandler} />
                  <MainContent drawerWidth={drawerWidth}>
                    <FiltersPage />
                  </MainContent>
                </PrivateRoute>
                <PrivateRoute path="/products">
                  <Header drawerWidth={drawerWidth} onLogout={logoutHandler} />
                  <MainContent drawerWidth={drawerWidth}>
                    <ProductsPage />
                    <SaleDialog />
                  </MainContent>
                </PrivateRoute>
                <PrivateRoute path="/employees">
                  <Header drawerWidth={drawerWidth} onLogout={logoutHandler} />
                  <MainContent drawerWidth={drawerWidth}>
                    <EmployeesPage />
                  </MainContent>
                </PrivateRoute>
                <PrivateRoute path="/sales">
                  <Header drawerWidth={drawerWidth} onLogout={logoutHandler} />
                  <MainContent drawerWidth={drawerWidth}>
                    <SalesPage />
                  </MainContent>
                </PrivateRoute>
              </Switch>
            </ThemeProvider>
          </FirestoreProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ErrorBoundary>
    // </div>
  );
};

export default App;
