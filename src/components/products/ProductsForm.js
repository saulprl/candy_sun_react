import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

import { isFuture, isPast } from "date-fns";

import {
  Box,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import ActionBar from "../ui/ActionBar";
import StyledCard from "../ui/StyledCard";

import classes from "./ProductsForm.module.css";
import { ephimeralNotification, showNotification } from "../../store/uiSlice";

const ProductsForm = (props) => {
  const { product, productRef } = props;

  const dispatch = useDispatch();
  const firestore = useFirestore();
  const productsCollectionRef = collection(firestore, "products");

  const titleInputRef = useRef();
  const quantityInputRef = useRef();
  const priceInputRef = useRef();
  const costInputRef = useRef();
  const caloriesInputRef = useRef();

  const [titleError, setTitleError] = useState(null);
  const [quantityError, setQuantityError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [costError, setCostError] = useState(null);
  const [caloriesError, setCaloriesError] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState({
    value: product ? product.dateOfPurchase.toDate() : null,
    error: null,
  });
  const [expirationDate, setExpirationDate] = useState({
    value: product ? product.expirationDate.toDate() : null,
    error: null,
  });
  const history = useHistory();

  const titleChangeHandler = (event) => {
    setTitleError(null);
  };

  const quantityChangeHandler = (event) => {
    setQuantityError(null);
  };

  const priceChangeHandler = (event) => {
    setPriceError(null);
  };

  const costChangeHandler = (event) => {
    setCostError(null);
  };

  const caloriesChangeHandler = (event) => {
    setCaloriesError(null);
  };

  const purchaseDateChangeHandler = (date) => {
    setPurchaseDate({ value: date, error: null });
  };

  const expirationDateChangeHandler = (date) => {
    setExpirationDate({ value: date, error: null });
  };

  const validateFields = (title, quantity, price, cost, calories) => {
    let formIsValid = true;

    if (title === "" || title.length < 3) {
      setTitleError(
        "El nombre del producto no debe estar vacío y debe tener más de dos caracteres."
      );
      formIsValid = false;
    }
    if (quantity === "" || +quantity < 1) {
      setQuantityError(
        "La cantidad no debe estar vacía y debe ser al menos 1."
      );
      formIsValid = false;
    }
    if (price === "" || +price < 0.0) {
      setPriceError("El precio no debe estar vacío y debe ser mayor a 0.");
      formIsValid = false;
    }
    if (cost === "" || +cost < 0.0) {
      setCostError("El costo no debe estar vacío y debe ser mayor a 0.");
      formIsValid = false;
    }
    if (calories === "" || +calories < 0.0) {
      setCaloriesError(
        "El campo de calorías no debe estar vacío y debe ser mayor a 0."
      );
      formIsValid = false;
    }
    if (purchaseDate.value === null) {
      setPurchaseDate((prevState) => {
        return {
          ...prevState,
          error: "Debes especificar una fecha de adquisición.",
        };
      });
      formIsValid = false;
    } else if (isFuture(purchaseDate.value)) {
      setPurchaseDate((prevState) => {
        return {
          ...prevState,
          error: "La fecha de compra no puede ser en el futuro.",
        };
      });
      formIsValid = false;
    }
    if (expirationDate.value === null) {
      setExpirationDate((prevState) => {
        return {
          ...prevState,
          error: "Debes especificar una fecha de expiración.",
        };
      });
      formIsValid = false;
    } else if (isPast(expirationDate.value)) {
      setExpirationDate((prevState) => {
        return {
          ...prevState,
          error: "La fecha de expiración no puede haber ocurrido ya.",
        };
      });
      formIsValid = false;
    }

    return formIsValid;
  };

  const saveProductHandler = async (event) => {
    const title = titleInputRef.current.value;
    const quantity = quantityInputRef.current.value;
    const price = priceInputRef.current.value;
    const cost = costInputRef.current.value;
    const calories = caloriesInputRef.current.value;

    if (validateFields(title, quantity, price, cost, calories)) {
      try {
        dispatch(
          showNotification({
            status: "info",
            message: "Guardando producto...",
          })
        );
        if (product) {
          await updateDoc(productRef, {
            title,
            quantity,
            price,
            cost,
            calories,
            dateOfPurchase: purchaseDate.value,
            expirationDate: expirationDate.value,
          });
        } else {
          await addDoc(productsCollectionRef, {
            title,
            quantity,
            price,
            cost,
            calories,
            dateOfPurchase: purchaseDate.value,
            expirationDate: expirationDate.value,
          });
        }
        dispatch(
          ephimeralNotification({
            status: "success",
            message: "Producto guardado.",
          })
        );

        history.push("/products");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const actions = [
    {
      label: "Guardar producto",
      color: "info",
      icon: <SaveIcon />,
      onClick: saveProductHandler,
    },
    {
      label: "Cancelar",
      color: "error",
      icon: <CancelIcon />,
      onClick: (event) => history.push("/products"),
    },
  ];

  return (
    <>
      <ActionBar actions={actions} />
      <StyledCard
        sx={{
          position: "relative",
          width: { xs: "90%", lg: "70%" },
          margin: "auto",
          mt: "1rem",
          mb: "1rem",
        }}
      >
        <CardContent>
          <Box component="form" className={classes.form}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={12} sm={8}>
                <TextField
                  inputRef={titleInputRef}
                  helperText={titleError !== null && titleError}
                  error={titleError !== null}
                  onChange={titleChangeHandler}
                  fullWidth
                  label="Nombre"
                  defaultValue={product ? product.title : ""}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  inputRef={quantityInputRef}
                  helperText={quantityError !== null && quantityError}
                  error={quantityError !== null}
                  onChange={quantityChangeHandler}
                  fullWidth
                  label="Cantidad"
                  type="number"
                  defaultValue={product ? product.quantity : ""}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  inputRef={caloriesInputRef}
                  helperText={caloriesError !== null && caloriesError}
                  error={caloriesError !== null}
                  onChange={caloriesChangeHandler}
                  fullWidth
                  label="Calorías"
                  type="number"
                  defaultValue={product ? product.calories : ""}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                {/* <TextField fullWidth label="Precio" /> */}
                <FormControl>
                  {/* <InputLabel htmlFor="price">Precio</InputLabel> */}
                  <OutlinedInput
                    inputRef={priceInputRef}
                    id="price"
                    type="number"
                    placeholder="Precio"
                    defaultValue={product ? product.price : ""}
                    onChange={priceChangeHandler}
                    error={priceError !== null}
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoneyIcon
                          color={priceError !== null ? "error" : "inherit"}
                        />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={priceError !== null}>
                    {priceError !== null && priceError}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                {/* <TextField fullWidth label="Costo" /> */}
                <FormControl>
                  {/* <InputLabel htmlFor="cost">Costo</InputLabel> */}
                  <OutlinedInput
                    inputRef={costInputRef}
                    id="cost"
                    type="number"
                    placeholder="Costo"
                    defaultValue={product ? product.cost : ""}
                    onChange={costChangeHandler}
                    error={costError !== null}
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoneyIcon
                          color={costError !== null ? "error" : "inherit"}
                        />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={costError !== null}>
                    {costError !== null && costError}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  disableFuture
                  label="Fecha de adquisición"
                  value={purchaseDate.value}
                  onChange={purchaseDateChangeHandler}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={purchaseDate.error !== null}
                      helperText={
                        purchaseDate.error !== null && purchaseDate.error
                      }
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "dd/mm/yyyy",
                      }}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }} /> */}
              <Grid item xs={12} sm={6}>
                <DatePicker
                  disablePast
                  label="Fecha de expiración"
                  value={expirationDate.value}
                  onChange={expirationDateChangeHandler}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color={
                        expirationDate.error !== null ? "error" : "primary"
                      }
                      error={expirationDate.error !== null}
                      helperText={
                        expirationDate.error !== null && expirationDate.error
                      }
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "dd/mm/yyyy",
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default ProductsForm;
