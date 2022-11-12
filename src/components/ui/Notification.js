import { useSelector } from "react-redux";

import { Alert, Box, CircularProgress, Slide } from "@mui/material";

import { selectNotification } from "../../store/uiSlice";

const Notification = (props) => {
  const notification = useSelector(selectNotification);

  return (
    <Slide
      direction="down"
      in={notification !== null}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          zIndex: "999",
          position: "absolute",
          width: { xs: "90%", sm: "75%" },
          mt: "3.5rem",
          ml: { xs: "5%", sm: "12.5%" },
        }}
      >
        {notification === null && (
          <Alert severity="info">
            <Box sx={{ width: "100%" }}>
              <CircularProgress color="primary" size="1rem" />
            </Box>
          </Alert>
        )}
        {notification !== null && (
          <Alert severity={notification.status || "info"}>
            {notification.message || <CircularProgress color="primary" />}
          </Alert>
        )}
      </Box>
    </Slide>
  );
};

export default Notification;
