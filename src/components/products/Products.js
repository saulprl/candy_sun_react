import { useSigninCheck } from "reactfire";

import { Alert, Box } from "@mui/material";

import AvailableProducts from "./AvailableProducts";
import ProductsSummary from "./ProductsSummary";

const Products = (props) => {
  const drawerWidth = props.drawerWidth;
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <ProductsSummary />
      {status === "success" && !signInCheckResult.signedIn && (
        <Box
          sx={{ margin: "auto", mt: "1.2rem", width: { xs: "90%", lg: "65%" } }}
        >
          <Alert severity="error">You are not authenticated!</Alert>
        </Box>
      )}
      {status === "loading" && (
        <Box
          sx={{ margin: "auto", mt: "1.2rem", width: { xs: "90%", lg: "65%" } }}
        >
          <Alert severity="info">Authenticating...</Alert>
        </Box>
      )}
      {status === "success" && signInCheckResult.signedIn && (
        <AvailableProducts />
      )}
    </Box>
  );
};

export default Products;
