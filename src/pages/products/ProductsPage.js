import { useEffect } from "react";

import { Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setTitle } from "../../store/uiSlice";

import AddProductPage from "./AddProductPage";
import EditProductPage from "./EditProductPage";

import Products from "../../components/products/Products";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setTitle("Productos"));
  }, [dispatch, location.pathname]);

  return (
    <>
      <Route
        path="/products"
        exact
        render={() => <Products drawerWidth={props.drawerWidth} />}
      />
      <Route path="/products/add" exact render={() => <AddProductPage />} />
      <Route
        path="/products/edit/:productId"
        render={() => <EditProductPage />}
      />
    </>
  );
};

export default ProductsPage;
