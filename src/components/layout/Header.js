import { useState } from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Skeleton,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Header.module.css";
import candyImg from "../../assets/various-candy.webp";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { useSigninCheck } from "reactfire";
import { Login, Logout } from "@mui/icons-material";

const Header = (props) => {
  const drawerWidth = props.drawerWidth;
  const theme = useTheme();
  const { status, data: signInCheckResult } = useSigninCheck();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <ResponsiveDrawer
        open={mobileOpen}
        onClose={toggleDrawerHandler}
        drawerWidth={drawerWidth}
        onToggleTheme={props.onToggleTheme}
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
              Candy Sun
            </Typography>
            {status === "loading" && (
              <Skeleton
                variant="rounded"
                height="1.5rem"
                width="6rem"
                animation="wave"
              />
            )}
            {status === "success" && !signInCheckResult.signedIn && (
              <IconButton
                onClick={props.onShowLogin}
                variant="text"
                color="action"
              >
                <Login />
              </IconButton>
            )}
            {status === "success" && signInCheckResult.signedIn && (
              <Tooltip title="Log out">
                <IconButton
                  onClick={props.onLogout}
                  variant="text"
                  color="action"
                >
                  <Logout />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <div className={styles["main-image"]}>
        <img src={candyImg} alt="Table full of delicious candy!" />
      </div>
    </>
  );
};

export default Header;
