import { forwardRef, useRef } from "react";
import {
  Box,
  CardContent,
  Modal,
  Portal,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import StyledCard from "../ui/StyledCard";

const Login = (props) => {
  const modalRoot = document.body;
  const email = useRef();
  const password = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin({
      email,
      password,
    });
  };

  return (
    <Portal container={modalRoot}>
      <Modal open={props.open} onClose={props.onClose}>
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
                  inputRef={email}
                  id="email"
                  label="Email"
                  type="email"
                  required
                />
                <Box sx={{ height: "1.2rem" }} />
                <TextField
                  inputRef={password}
                  id="password"
                  label="Password"
                  type="password"
                  required
                />
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
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
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
      </Modal>
    </Portal>
  );
};

export default Login;
