import { Redirect } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import Products from "../components/products/Products";
import SplashScreen from "../components/ui/SplashScreen";

const ProductsPage = (props) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <>
      {status === "loading" && <SplashScreen />}
      {status === "success" && !signInCheckResult.signedIn && (
        <Redirect to="/login" />
      )}
      {status === "success" && signInCheckResult.signedIn && (
        <Products drawerWidth={props.drawerWidth} />
      )}
    </>
  );
};

export default ProductsPage;
