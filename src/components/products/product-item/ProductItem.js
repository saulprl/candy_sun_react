import { Box, Chip, Divider, ListItem, Typography } from "@mui/material";

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
            <Chip variant="outlined" label={`x${product.quantity}`} />
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
          <Chip
            variant="outlined"
            color="primary"
            label={`$${product.price}`}
          />
          <Chip variant="outlined" color="error" label={`$${product.cost}`} />
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
