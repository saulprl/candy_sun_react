import { CardContent, Typography } from "@mui/material";

import StyledCard from "../ui/StyledCard";

const ProductsSummary = (props) => {
  return (
    <section>
      <StyledCard
        sx={{
          width: { xs: "89%", lg: "70%" },
          position: "relative",
          marginTop: "-15rem",
          textAlign: "center",
          mr: "auto",
          ml: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            consequat eros massa, at malesuada odio.
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            consequat eros massa, at malesuada odio.
          </Typography>
        </CardContent>
      </StyledCard>
    </section>
  );
};

export default ProductsSummary;
