import { Box } from "@mui/material";
import AvailableProducts from "./AvailableProducts";
import ProductsSummary from "./ProductsSummary";

const Products = (props) => {
  const drawerWidth = props.drawerWidth;

  return (
    <Box
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <ProductsSummary />
      <AvailableProducts />
    </Box>
  );
};

export default Products;
