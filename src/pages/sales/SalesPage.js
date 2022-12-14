import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setTitle } from "../../store/uiSlice";
import { Route, useLocation } from "react-router-dom";

import Sales from "../../components/sales/Sales";
import SaleForm from "../../components/sales/SaleForm";

const SalesPage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setTitle("Ventas"));
  }, [pathname, dispatch]);

  return (
    <>
      <Route
        path="/sales"
        exact
        render={() => <Sales drawerWidth={props.drawerWidth} />}
      />
      <Route path="/sales/add" exact render={() => <SaleForm />} />
    </>
  );
};

export default SalesPage;
