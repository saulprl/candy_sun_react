import { forwardRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { resetSaleDialog, selectSaleDialog } from "../../store/uiSlice";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaleDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectSaleDialog);

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
        <FormControl>
          <InputLabel>Cantidad</InputLabel>
          <OutlinedInput
            autoFocus
            id="quantity"
            type="number"
            inputProps={{ min: 1, max: dialog !== null ? dialog.maxQty : 1 }}
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="success"
          onClick={() => console.log(dialog.productId)}
        >
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
