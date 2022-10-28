import { Card } from "@mui/material";

const StyledCard = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "1rem",
        borderRadius: "14px",
        boxShadow: "0 1px 18px 10px rgba(0, 0, 0, 0.24)",
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  );
};

export default StyledCard;
