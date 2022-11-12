import { Redirect, Route } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import SplashScreen from "../ui/SplashScreen";

const PrivateRoute = (props) => {
  const { children, ...rest } = props;
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <SplashScreen />;
  }

  return (
    <Route
      {...rest}
      render={() =>
        signInCheckResult.signedIn ? children : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
