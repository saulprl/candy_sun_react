import {
  Box,
  Chip,
  Divider,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";

import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { product } = props;

  return (
    <>
      <ListItem
        // className={styles.product}
        sx={{
          height: { sm: "5.5rem" },
          display: "flex",
          flexDirection: { sm: "column" },
          justifyContent: { sm: "space-between" },
          alignContent: { sm: "flex-start" },
          alignItems: { sm: "flex-start" },
        }}
      >
        <Box component="div" className={styles.header}>
          <Typography variant="h5" sx={{ mr: "0.5rem" }}>
            {product.title}
          </Typography>
          <Box component="div">
            <Tooltip title="Quantity" placement="right-start">
              <Chip variant="outlined" label={`x${product.quantity}`} />
            </Tooltip>
            <Chip
              variant="outlined"
              color="primary"
              label={`$${product.price}`}
              sx={{ display: { sm: "none" } }}
            />
          </Box>
          {/* <Typography variant="h5" component="span">
          x{product.quantity}
        </Typography> */}
        </Box>
        <Box
          component="div"
          className={styles.details}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Tooltip title="Price">
            <Chip
              variant="outlined"
              color="primary"
              label={`$${product.price}`}
              sx={{ mr: "0.5rem" }}
            />
          </Tooltip>
          <Tooltip title="Cost">
            <Chip variant="outlined" color="error" label={`$${product.cost}`} />
          </Tooltip>
          {/* <Typography variant="body1" component="span">
            ${product.price}
          </Typography> */}
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProductItem;
