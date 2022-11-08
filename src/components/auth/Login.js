import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useFirebaseApp } from "reactfire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  Box,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

import StyledCard from "../ui/StyledCard";

const Login = (props) => {
  const history = useHistory();
  const firebaseApp = useFirebaseApp();
  const authInstance = getAuth(firebaseApp);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState("");

  const emailChangeHandler = (event) => {
    setError("");
  };

  const passwordChangeHandler = (event) => {
    setError("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log({ email, password });
    try {
      await signInWithEmailAndPassword(
        authInstance,
        emailInputRef.current.value,
        passwordInputRef.current.value
      );
      // props.onClose(event);
      history.push("/");
      window.location.reload(false);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Authentication error: user not found.");
      }
      if (error.code === "auth/wrong-password") {
        setError("Authentication error: incorrect password.");
      }
    }
  };

  return (
    <>
      <Box>
        <StyledCard
          sx={{
            width: { xs: "95%", lg: "40%" },
            margin: "auto",
            mt: { xs: "40%", sm: "20%" },
          }}
        >
          <CardContent>
            <Typography variant="h5">Login</Typography>
            <Box sx={{ height: "0.8rem" }} />
            <form onSubmit={submitHandler}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  inputRef={emailInputRef}
                  onChange={emailChangeHandler}
                  id="email"
                  label="Email"
                  type="email"
                  required
                  sx={{ mb: "1rem" }}
                />
                <TextField
                  inputRef={passwordInputRef}
                  onChange={passwordChangeHandler}
                  id="password"
                  label="Password"
                  type="password"
                  required
                  sx={{ mb: "1rem" }}
                />
              </Box>
              <Collapse in={error.trim() !== ""}>
                <Box sx={{ mb: "1rem" }}>
                  <Alert severity="error">{error}</Alert>
                </Box>
              </Collapse>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "right",
                }}
              >
                <Button variant="contained" type="submit" color="primary">
                  Login
                </Button>
              </Box>
            </form>
          </CardContent>
        </StyledCard>
      </Box>
    </>
  );
};

export default Login;
