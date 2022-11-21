import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
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
      await deleteDoc(doc(firestore, "sales", sale.id));
      dispatch(
        ephimeralNotification({
          status: "success",
          messsage: "Registro eliminado.",
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
        <Collapse in={expanded} sx={{ mt: "0.5rem" }}>
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
        </Collapse>
      </Box>
    </>
  );
};

export default SaleItem;
