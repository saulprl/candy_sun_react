import { Box } from "@mui/material";

const MainContent = (props) => {
  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth})` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      {props.children}
    </Box>
  );
};

export default MainContent;
