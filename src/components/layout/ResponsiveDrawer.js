import { useHistory } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ResponsiveDrawer = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const { drawerWidth } = props;
  // const { window } = props;

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  const drawerButtons = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      onClick: (event) => {
        history.push("/");
        props.onClose(event);
      },
    },
    {
      text: "Productos",
      icon: <CategoryIcon />,
      onClick: (event) => {
        history.push("/products");
        props.onClose(event);
      },
    },
    {
      text: "Empleados",
      icon: <PersonIcon />,
      onClick: (event) => {
        history.push("/employees");
        props.onClose(event);
      },
    },
    {
      text: "Ventas",
      icon: <AttachMoneyIcon />,
      onClick: (event) => {
        history.push("/sales");
        props.onClose(event);
      },
    },
  ];

  const drawer = (
    <div>
      <Toolbar
        variant="dense"
        sx={{
          background: theme.palette.primary.main,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.action.main }}>
          Candy Sun
        </Typography>
        <Tooltip
          title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
        >
          <IconButton onClick={props.onToggleTheme}>
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon color="action" />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      {drawerButtons.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={props.open}
          onClose={props.onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              background: theme.palette.background.main,
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              background: theme.palette.background.main,
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
