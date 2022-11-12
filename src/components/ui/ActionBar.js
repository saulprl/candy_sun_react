import { Box, Collapse, IconButton, Tooltip } from "@mui/material";

import StyledCard from "./StyledCard";

const ActionBar = (props) => {
  const { showSearchBar } = props;

  const barMaxWidth = {
    xs: showSearchBar ? "90%" : "55%",
    sm: showSearchBar ? "60%" : "30%",
    md: showSearchBar ? "40%" : "20%",
    lg: showSearchBar ? "28%" : "15%",
  };

  const mappedActions = props.actions.map((item) => {
    if (item.hiddenElement) {
      return (
        <Box key={item.label} sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title={item.label} placement="top">
            <IconButton color={item.color} onClick={item.onClick}>
              {item.icon}
            </IconButton>
          </Tooltip>
          <Collapse orientation="horizontal" in={showSearchBar}>
            {item.hiddenElement}
          </Collapse>
        </Box>
      );
    }

    return (
      <Tooltip key={item.label} title={item.label} placement="top">
        <IconButton color={item.color} onClick={item.onClick}>
          {item.icon}
        </IconButton>
      </Tooltip>
    );
  });

  return (
    <StyledCard
      sx={{
        position: "relative",
        margin: "auto",
        mt: "-15rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: {
          xs: mappedActions.length > 2 ? "space-around" : "space-evenly",
          sm: "space-around",
        },
        alignItems: "center",
        maxWidth: barMaxWidth,
        borderRadius: { xs: "32px", sm: "32px" },
        padding: { sm: "0" },
      }}
    >
      {mappedActions}
    </StyledCard>
  );
};

export default ActionBar;
