import { forwardRef, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  ephimeralNotification,
  resetSaleDialog,
  selectSaleDialog,
  showNotification,
} from "../../store/uiSlice";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaleDialog = () => {
  const quantityRef = useRef();

  const dispatch = useDispatch();
  const dialog = useSelector(selectSaleDialog);

  const user = useUser();
  const firestore = useFirestore();
  const salesCollectionRef = collection(firestore, "sales");

  const quantityChangeHandler = (event) => {
    if (+event.target.value > dialog.maxQty) {
      quantityRef.current.value = dialog.maxQty;
    }
    if (+event.target.value < 0) {
      quantityRef.current.value = 1;
    }
  };

  const confirmSaleHandler = async (event) => {
    const productId = dialog.productId;
    const quantity = quantityRef.current.value;
    const productPrice = dialog.productPrice;
    if (quantity < 1 || quantity > dialog.maxQty) {
      return;
    }

    try {
      dispatch(
        showNotification({
          status: "info",
          message: "Procesando datos de la venta...",
        })
      );

      await addDoc(salesCollectionRef, {
        total: +(productPrice * quantity).toFixed(2),
        products: [
          { productId, pricePoint: +productPrice, quantity: +quantity },
        ],
        saleDate: new Date(),
        employeeId: user.data.uid,
      });

      const soldProduct = await getDoc(doc(firestore, "products", productId));
      await updateDoc(soldProduct.ref, {
        quantity: soldProduct.data().quantity - quantity,
      });

      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Venta registrada con éxito.",
        })
      );
    } catch (error) {
      dispatch(
        ephimeralNotification({
          status: "error",
          message: "Ocurrió un problema al registrar la venta.",
        })
      );
    } finally {
      dispatch(resetSaleDialog());
    }
  };

  return (
    <Dialog
      open={dialog !== null}
      TransitionComponent={Transition}
      onClose={() => dispatch(resetSaleDialog())}
    >
      <DialogTitle>Vender producto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialog !== null ? dialog.text : ""}
        </DialogContentText>
        <TextField
          inputRef={quantityRef}
          onChange={quantityChangeHandler}
          autoFocus
          label="Cantidad"
          id="quantity"
          type="number"
          defaultValue="1"
          fullWidth
          inputProps={{ min: 1, max: dialog !== null ? dialog.maxQty : 1 }}
          sx={{ mt: "0.5rem" }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="success" onClick={confirmSaleHandler}>
          Confirmar
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={() => dispatch(resetSaleDialog())}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaleDialog;
