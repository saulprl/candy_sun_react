import { useState } from "react";

import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ExpandMore, ExpandLess, Edit, Delete } from "@mui/icons-material";

import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { product } = props;
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const chipVariant = theme.palette.mode === "dark" ? "outlined" : "contained";

  const toggleDetails = (event) => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <>
      <Box component="li">
        <Box component="div" className={styles.header}>
          <Tooltip title="Quantity" placement="top">
            <Chip variant={chipVariant} label={`x${product.quantity}`} />
          </Tooltip>
          <Typography variant="h6">{product.title}</Typography>
          <IconButton onClick={toggleDetails}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={expanded}>
          <Box component="div" className={styles.details}>
            <Box
              component="div"
              className={styles["details-row"]}
              sx={{ justifyContent: { sm: "space-between" } }}
            >
              <Tooltip title="Calories">
                <Chip
                  variant={chipVariant}
                  color="info"
                  label={product.calories}
                />
              </Tooltip>
              <Tooltip title="Price">
                <Chip
                  variant={chipVariant}
                  color="primary"
                  label={`$${product.price}`}
                />
              </Tooltip>
              <Tooltip title="Cost">
                <Chip
                  variant={chipVariant}
                  color="error"
                  label={`$${product.cost}`}
                />
              </Tooltip>
              <Tooltip
                title="Purchase date"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <Chip
                  variant={chipVariant}
                  color="info"
                  label={product.dateOfPurchase}
                />
              </Tooltip>
              <Tooltip
                title="Expiration date"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <Chip
                  variant={chipVariant}
                  color="warning"
                  label={product.expirationDate}
                />
              </Tooltip>
            </Box>
            <Box
              component="div"
              className={styles["details-row"]}
              sx={{ display: { sm: "none" } }}
            >
              <Tooltip title="Purchase date">
                <Chip
                  variant={chipVariant}
                  color="info"
                  label={product.dateOfPurchase}
                />
              </Tooltip>
              <Tooltip title="Expiration date">
                <Chip
                  variant={chipVariant}
                  color="warning"
                  label={product.expirationDate}
                />
              </Tooltip>
            </Box>
          </Box>
          <Box
            component="div"
            className={styles.actions}
            sx={{
              display: { sm: "none" },
              justifyContent: { xs: "flex-end" },
            }}
          >
            <IconButton color="warning" edge="end">
              <Edit />
            </IconButton>
            <IconButton color="error" edge="end">
              <Delete />
            </IconButton>
          </Box>
          <Box
            component="div"
            className={styles.actions}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: { sm: "space-evenly" },
            }}
          >
            <Button variant="contained" color="secondary" startIcon={<Edit />}>
              Edit
            </Button>
            <Button variant="contained" color="error" startIcon={<Delete />}>
              Delete
            </Button>
          </Box>
        </Collapse>
      </Box>
      <Divider sx={{ mb: "0.3rem" }} />
    </>
  );
};

export default ProductItem;
