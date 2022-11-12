import { Avatar, Box, Typography, useTheme } from "@mui/material";

const EmployeeItem = (props) => {
  const theme = useTheme();
  const { employee } = props;

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette.primary.main,
          mr: "1rem",
          width: "3.5rem",
          height: "3.5rem",
        }}
      >
        {employee.displayName.charAt(0)}
      </Avatar>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6">{employee.displayName}</Typography>
        <Typography variant="p" sx={{ pt: "0", color: "gray" }}>
          {employee.role}
        </Typography>
      </Box>
    </Box>
  );
};

export default EmployeeItem;
