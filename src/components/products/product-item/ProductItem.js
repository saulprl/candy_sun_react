import { useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useFirestore, useFirestoreDocDataOnce, useUser } from "reactfire";
import { deleteDoc, doc } from "firebase/firestore";

import {
  Box,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Edit,
  Delete,
  Sell,
} from "@mui/icons-material";
import { format } from "date-fns";

import {
  ephimeralNotification,
  showNotification,
  showSaleDialog,
} from "../../../store/uiSlice";

import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { product } = props;
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [expanded, setExpanded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const user = useUser();
  const { status: employeeStatus, data: employeeData } =
    useFirestoreDocDataOnce(doc(firestore, "users", user.data.uid), {
      idField: "id",
    });

  const chipVariant = theme.palette.mode === "dark" ? "outlined" : "contained";

  const toggleDetails = (event) => {
    setExpanded((prevState) => !prevState);
  };

  const editProductHandler = (event) => {
    history.push(`/products/edit/${product.id}`);
  };

  const sellProductHandler = (event) => {
    dispatch(
      showSaleDialog({
        text: `Ingresa la cantidad de ${product.title} a vender.`,
        maxQty: product.quantity,
        productId: product.id,
        price: product.price,
      })
    );
  };

  const deleteProductHandler = (event) => {
    setShowDialog(true);
  };

  const confirmDeleteHandler = async (event) => {
    setShowDialog(false);
    dispatch(
      showNotification({
        status: "info",
        title: "",
        message: "Eliminando el producto...",
      })
    );
    try {
      await deleteDoc(doc(firestore, "products", `${product.id}`));
      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Producto eliminado.",
        })
      );
    } catch (error) {
      dispatch(
        ephimeralNotification({
          status: "error",
          message: "Ocurrió un error al eliminar.",
        })
      );
    }
  };

  const closeDialogHandler = (event) => {
    setShowDialog(false);
  };

  return (
    <>
      <Box component="div">
        <Box component="div" className={styles.header}>
          <Tooltip title="Cantidad" placement="top">
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
              display: { xs: "flex" },
              pt: "0",
              pl: { xs: "1rem", sm: "0", lg: "0.5rem" },
              mb: { sm: "0.5rem" },
            }}
          >
            <Grid item xs={6}>
              <Tooltip title="Precio">
                <Chip
                  variant={chipVariant}
                  color="success"
                  label={`$${product.price}`}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Fecha de adquisición">
                <Chip
                  variant={chipVariant}
                  color="info"
                  label={format(product.dateOfPurchase.toDate(), "dd MMM yyyy")}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Costo">
                <Chip
                  variant={chipVariant}
                  color="error"
                  label={`$${product.cost}`}
                  sx={{ minWidth: "103px" }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Fecha de expiración">
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
              display: { xs: "none" },
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
              // display: { sm: "none" },
              justifyContent: "space-around",
              mt: { xs: "0.5rem", sm: "0" },
            }}
          >
            <Tooltip title="Editar producto">
              <IconButton
                color="warning"
                // edge="end"
                onClick={editProductHandler}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Vender">
              <IconButton color="success" onClick={sellProductHandler}>
                <Sell />
              </IconButton>
            </Tooltip>
            {employeeStatus === "loading" && (
              <Skeleton
                animation="wave"
                variant="circular"
                width={15}
                height={15}
              />
            )}
            {employeeStatus === "success" &&
              employeeData.role === "Administrador" && (
                <Tooltip title="Eliminar producto">
                  <IconButton
                    color="error"
                    // edge="end"
                    onClick={deleteProductHandler}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
          </Box>
          {/* <Box
            component="div"
            className={styles.actions}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: { sm: "space-evenly" },
            }}
          >
            <Button
              onClick={editProductHandler}
              variant="contained"
              color="secondary"
              startIcon={<Edit />}
              size="small"
            >
              Editar
            </Button>
            <Button
              onClick={deleteProductHandler}
              variant="contained"
              color="error"
              startIcon={<Delete />}
              size="small"
            >
              Eliminar
            </Button>
          </Box> */}
        </Collapse>
      </Box>
      <Dialog open={showDialog} onClose={closeDialogHandler}>
        <DialogTitle>¿Eliminar producto?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El producto será eliminado permanentemente y no podrá ser
            recuperado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDeleteHandler} color="error">
            Eliminar
          </Button>
          <Button onClick={closeDialogHandler} autoFocus color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Divider />
    </>
  );
};

export default ProductItem;
