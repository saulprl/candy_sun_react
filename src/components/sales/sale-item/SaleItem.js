import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
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
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirestore } from "reactfire";
import {
  ephimeralNotification,
  showNotification,
} from "../../../store/uiSlice";
import SaleProductItem from "./SaleProductItem";

const SaleItem = (props) => {
  const { sale } = props;

  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [expanded, setExpanded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const chipVariant = theme.palette.mode === "dark" ? "outlined" : "contained";

  const toggleDetails = (event) => {
    setExpanded((prevState) => !prevState);
  };

  const deleteSaleHandler = (event) => {
    setShowDialog(true);
  };

  const confirmDeleteHandler = async (event) => {
    setShowDialog(false);
    dispatch(
      showNotification({
        status: "info",
        message: "Eliminando el registro...",
      })
    );

    try {
      for (let prod of sale.products) {
        let productRef = doc(firestore, "products", prod.productId);
        let productData = await getDoc(productRef);
        await updateDoc(productRef, {
          quantity: +productData.data().quantity + +prod.quantity,
        });
      }

      await deleteDoc(doc(firestore, "sales", sale.id));
      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Registro eliminado.",
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
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "0.5rem",
          }}
        >
          <Typography variant="body1">
            {format(sale.saleDate.toDate(), "dd MMM yyyy")}
          </Typography>
          <Tooltip title="Total" placement="top">
            <Chip variant={chipVariant} label={`$${sale.total.toFixed(2)}`} />
          </Tooltip>
          <Tooltip title="Expandir" placement="top">
            <IconButton onClick={toggleDetails}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Tooltip>
        </Box>
        <Collapse in={expanded}>
          <Grid container spacing={1}>
            {sale.products.map((p) => (
              <SaleProductItem
                key={p.productId}
                prodId={p.productId}
                quantity={p.quantity}
                price={p.pricePoint}
              />
            ))}
          </Grid>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              mt: "0.5rem",
            }}
          >
            <IconButton color="error" onClick={deleteSaleHandler}>
              <Delete />
            </IconButton>
          </Box>
        </Collapse>
      </Box>
      <Dialog open={showDialog} onClose={closeDialogHandler}>
        <DialogTitle>¿Eliminar registro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El registro será eliminado permanentemente y no podrá ser
            recuperado. Los productos vendidos serán restablecidos.
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
    </>
  );
};

export default SaleItem;
