import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";

import { setTitle } from "../../store/uiSlice";

import Dashboard from "../../components/dashboard/Dashboard";

const DashboardPage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setTitle("Inicio"));
  }, [pathname, dispatch]);

  return (
    <>
      <Route
        path="/home"
        exact
        render={() => <Dashboard drawerWidth={props.drawerWidth} />}
      />
    </>
  );
};

export default DashboardPage;
