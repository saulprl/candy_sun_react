import { useState } from "react";
import { useFirebaseApp, useSigninCheck } from "reactfire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  Box,
  CardContent,
  Modal,
  Portal,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

import StyledCard from "../ui/StyledCard";
import LoadingButton from "../ui/LoadingButton";

const Login = (props) => {
  const firebaseApp = useFirebaseApp();
  const authInstance = getAuth(firebaseApp);
  const { status, data: signinCheckResult } = useSigninCheck();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalRoot = document.body;

  const emailChangeHandler = (event) => {
    setError("");
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setError("");
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log({ email, password });
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      // props.onClose(event);
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
    <Portal container={modalRoot}>
      <Modal open={props.open} onClose={props.onClose}>
        <Box>
          <StyledCard
            sx={{
              width: { xs: "70%", lg: "40%" },
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
                    onChange={emailChangeHandler}
                    id="email"
                    label="Email"
                    type="email"
                    required
                  />
                  <Box sx={{ height: "1.2rem" }} />
                  <TextField
                    onChange={passwordChangeHandler}
                    id="password"
                    label="Password"
                    type="password"
                    required
                  />
                </Box>
                <Box sx={{ mt: "0.8rem" }}>
                  <Collapse in={error.trim() !== ""}>
                    <Alert severity="error">{error}</Alert>
                  </Collapse>
                </Box>
                <Box sx={{ height: "1.2rem" }} />
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "right",
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    status={status}
                  >
                    Login
                  </LoadingButton>
                  <Box sx={{ width: "0.5rem" }} />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={props.onClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </CardContent>
          </StyledCard>
        </Box>
      </Modal>
    </Portal>
  );
};

export default Login;
