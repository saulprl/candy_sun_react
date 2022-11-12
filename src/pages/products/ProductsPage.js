import { Redirect, Route, useLocation } from "react-router-dom";

import { useSigninCheck } from "reactfire";

import AddProductPage from "./AddProductPage";
import EditProductPage from "./EditProductPage";

import Products from "../../components/products/Products";
import SplashScreen from "../../components/ui/SplashScreen";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../store/uiSlice";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { status, data: signInCheckResult } = useSigninCheck();

  useEffect(() => {
    dispatch(setTitle("Productos"));
  }, [status, dispatch, location.pathname]);

  return (
    <>
      <Route path="/products" exact>
        {status === "loading" && <SplashScreen />}
        {status === "success" && !signInCheckResult.signedIn && (
          <Redirect to="/login" />
        )}
        {status === "success" && signInCheckResult.signedIn && (
          <Products drawerWidth={props.drawerWidth} />
        )}
      </Route>
      <Route path="/products/add" exact>
        <AddProductPage />
      </Route>
      <Route path="/products/edit/:productId">
        <EditProductPage />
      </Route>
    </>
  );
};

export default ProductsPage;
