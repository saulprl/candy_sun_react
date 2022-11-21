import { useSelector } from "react-redux";

import { Alert, Box, CircularProgress, Portal, Slide } from "@mui/material";

import { selectNotification } from "../../store/uiSlice";

const Notification = (props) => {
  const { drawerWidth } = props;
  const notification = useSelector(selectNotification);

  return (
    <Portal container={document.getElementById("notification")}>
      <Slide
        direction="down"
        in={notification === null}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            zIndex: "999",
            position: "fixed",
            width: {
              xs: "90%",
              sm: `calc(calc(100% - ${drawerWidth}px) * 0.75)`,
              md: `calc(calc(100% - ${drawerWidth}px) * 0.6)`,
            },
            mt: "3.5rem",
            ml: {
              xs: "5%",
              sm: `calc(${drawerWidth}px + calc(calc(100% - ${drawerWidth}px) * 0.125))`,
              md: `calc(${drawerWidth}px + calc(calc(100% - ${drawerWidth}px) * 0.2))`,
            },
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
    </Portal>
  );
};

export default Notification;
