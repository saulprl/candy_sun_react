import { useState } from "react";
import { useSelector } from "react-redux";

import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocDataOnce, useUser } from "reactfire";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { selectHeaderTitle } from "../../store/uiSlice";

import ResponsiveDrawer from "./ResponsiveDrawer";
import Notification from "../ui/Notification";
import MenuButton from "../ui/MenuButton";

import styles from "./Header.module.css";
import candyImg from "../../assets/various-candy.webp";

const Header = (props) => {
  const drawerWidth = props.drawerWidth;
  const theme = useTheme();
  const headerTitle = useSelector(selectHeaderTitle);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useUser();

  const firestore = useFirestore();
  const { status, data } = useFirestoreDocDataOnce(
    doc(firestore, "users", user.data.uid),
    {
      idField: "id",
    }
  );

  const toggleDrawerHandler = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <ResponsiveDrawer
        open={mobileOpen}
        onClose={toggleDrawerHandler}
        drawerWidth={drawerWidth}
      />
      <header>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: theme.palette.primary.main,
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              onClick={toggleDrawerHandler}
              edge="start"
              size="small"
              color="action"
              sx={{ mr: "2", display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" flex="1" component="div">
              {headerTitle}
            </Typography>
            {status === "success" && (
              <MenuButton
                displayName={data.displayName}
                role={data.role}
                onLogout={props.onLogout}
              />
            )}
            {/* <Tooltip title="Cerrar sesión">
              <IconButton
                onClick={props.onLogout}
                variant="text"
                color="action"
              >
                <Logout />
              </IconButton>
            </Tooltip> */}
          </Toolbar>
        </AppBar>
      </header>
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Notification drawerWidth={drawerWidth} />
      </Box>

      <div className={styles["main-image"]}>
        <img src={candyImg} alt="Table full of delicious candy!" />
      </div>
    </>
  );
};

export default Header;
