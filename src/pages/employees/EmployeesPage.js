import { useEffect } from "react";

import { Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setTitle } from "../../store/uiSlice";

import Employees from "../../components/employees/Employees";
import EmployeeForm from "../../components/employees/EmployeeForm";

const EmployeesPage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setTitle("Empleados"));
  }, [dispatch, pathname]);

  return (
    <>
      <Route path="/employees" exact render={() => <Employees />} />
      <Route path="/employees/add" exact render={() => <EmployeeForm />} />
    </>
  );
};

export default EmployeesPage;
