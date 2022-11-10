import { useSigninCheck } from "reactfire";

import { Box } from "@mui/material";

import SplashScreen from "./SplashScreen";
import { Redirect } from "react-router-dom";

const MainContent = (props) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <>
      {status === "loading" && <SplashScreen />}
      {status === "success" && !signInCheckResult.signedIn && (
        <Redirect to="/login" />
      )}
      {status === "success" && signInCheckResult.signedIn && (
        <Box
          sx={{
            width: { sm: `calc(100% - ${props.drawerWidth})` },
            ml: { sm: `${props.drawerWidth}px` },
          }}
        >
          {props.children}
        </Box>
      )}
    </>
  );
};

export default MainContent;
