import { Redirect } from "react-router-dom";

import { useSigninCheck } from "reactfire";

import LoginCard from "../components/auth/Login";
import SplashScreen from "../components/ui/SplashScreen";

const Login = (props) => {
  const { status, data: signinCheckResult } = useSigninCheck();

  return (
    <>
      {status === "loading" && <SplashScreen />}
      {status === "success" && signinCheckResult.signedIn && (
        <Redirect to="/" />
      )}
      {status === "success" && !signinCheckResult.signedIn && <LoginCard />}
    </>
  );
};

export default Login;
