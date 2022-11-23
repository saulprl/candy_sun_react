import { useState } from "react";

import { IconButton, ListItem, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MenuButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const clickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = (event) => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={clickHandler}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ListItem>Sesión iniciada como {props.displayName}</ListItem>
        <ListItem>Rol: {props.role}</ListItem>
        <MenuItem onClick={props.onLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default MenuButton;
