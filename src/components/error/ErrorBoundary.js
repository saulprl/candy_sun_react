import React from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Box
          sx={{
            pt: "37%",
            pb: "100%",
            width: "100%",
            height: "100%",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            background: "#232323",
            color: "whitesmoke",
          }}
        >
          <Typography sx={{ fontWeight: "bold", pb: "1rem" }} variant="h2">
            Candy Sun
          </Typography>
          <CircularProgress disableShrink color="primary" />
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
