import { Redirect, Route } from "react-router-dom";

import { useSigninCheck } from "reactfire";

import AddProductPage from "./AddProductPage";
import EditProductPage from "./EditProductPage";

import Products from "../../components/products/Products";
import SplashScreen from "../../components/ui/SplashScreen";

const ProductsPage = (props) => {
  const { status, data: signInCheckResult } = useSigninCheck();

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
