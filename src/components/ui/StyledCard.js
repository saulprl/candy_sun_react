import { Card } from "@mui/material";

const StyledCard = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: { xs: "0", sm: "1rem" },
        borderRadius: { xs: "6px", sm: "12px" },
        boxShadow: "0 1px 18px 10px rgba(0, 0, 0, 0.24)",
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  );
};

export default StyledCard;
