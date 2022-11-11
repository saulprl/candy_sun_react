import { useState } from "react";

import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ExpandMore, ExpandLess, Edit, Delete } from "@mui/icons-material";

import styles from "./ProductItem.module.css";
import { format } from "date-fns";

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
          <Grid
            container
            spacing={1}
            sx={{
              mt: "0.5rem",
              display: { xs: "flex", sm: "none" },
              pt: "0",
              pl: { xs: "1rem", sm: "0", md: "3rem" },
            }}
          >
            <Grid item xs={6} sm={3}>
              <Tooltip title="Price">
                <Chip
                  variant={chipVariant}
                  color="success"
                  label={`$${product.price}`}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Tooltip title="Purchase date">
                <Chip
                  variant={chipVariant}
                  color="info"
                  label={format(product.dateOfPurchase.toDate(), "dd MMM yyyy")}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Tooltip title="Cost">
                <Chip
                  variant={chipVariant}
                  color="error"
                  label={`$${product.cost}`}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Tooltip title="Expiration date">
                <Chip
                  variant={chipVariant}
                  color="warning"
                  label={format(product.expirationDate.toDate(), "dd MMM yyyy")}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Box
            component="div"
            className={styles.details}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: { md: "space-evenly" },
            }}
          >
            {/* <Box
              component="div"
              className={styles["details-row"]}
              sx={{ justifyContent: { sm: "space-between" } }}
            > */}
            <Tooltip title="Price">
              <Chip
                variant={chipVariant}
                color="success"
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
                label={format(product.dateOfPurchase.toDate(), "dd MMM yyyy")}
              />
            </Tooltip>
            <Tooltip
              title="Expiration date"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <Chip
                variant={chipVariant}
                color="warning"
                label={format(product.expirationDate.toDate(), "dd MMM yyyy")}
              />
            </Tooltip>
            {/* </Box> */}
            <Box
              component="div"
              className={styles["details-row"]}
              sx={{ display: { sm: "none" } }}
            >
              <Tooltip title="Purchase date">
                <Chip
                  variant={chipVariant}
                  color="info"
                  label={format(product.dateOfPurchase.toDate(), "dd MMM yyyy")}
                />
              </Tooltip>
              <Tooltip title="Expiration date">
                <Chip
                  variant={chipVariant}
                  color="warning"
                  label={format(product.expirationDate.toDate(), "dd MMM yyyy")}
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
      <Divider />
    </>
  );
};

export default ProductItem;
