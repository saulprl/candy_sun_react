import { useEffect } from "react";

import { Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setTitle } from "../../store/uiSlice";

import Employees from "../../components/employees/Employees";

const EmployeesPage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setTitle("Empleados"));
  }, [dispatch, pathname]);

  return (
    <>
      <Route path="/employees" exact render={() => <Employees />} />
    </>
  );
};

export default EmployeesPage;
