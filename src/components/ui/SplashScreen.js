import { Box, CircularProgress, Portal, Typography } from "@mui/material";

const SplashScreen = (props) => {
  const container = document.getElementById("modal");

  return (
    <Portal container={container}>
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
    </Portal>
  );
};

export default SplashScreen;
