import { Add, Cancel, Remove, Save } from "@mui/icons-material";
import {
  Button,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Slide,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import {
  addItem,
  removeItem,
  resetCart,
  selectCart,
  selectTotalItems,
} from "../../store/cartSlice";
import { ephimeralNotification, showNotification } from "../../store/uiSlice";
import ActionBar from "../ui/ActionBar";
import StyledCard from "../ui/StyledCard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SaleForm = () => {
  const theme = useTheme();
  const history = useHistory();

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalItems = useSelector(selectTotalItems);

  const user = useUser();
  const firestore = useFirestore();
  const productsCollectionRef = collection(firestore, "products");
  const salesCollectionRef = collection(firestore, "sales");
  const productsQuery = query(
    productsCollectionRef,
    orderBy("quantity", "desc"),
    where("quantity", ">", 0)
  );
  const { status, data: productsData } = useFirestoreCollectionData(
    productsQuery,
    {
      idField: "id",
    }
  );

  const [filter, setFilter] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setTotalAmount(0);
    for (const product of cart) {
      setTotalAmount(
        (prevTotal) => prevTotal + product.pricePoint * product.quantity
      );
    }
  }, [cart, setTotalAmount]);

  const chipVariant = theme.palette.mode === "dark" ? "outlined" : "contained";

  const searchChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  const addToCart = (productId, productPrice, maxQuantity) => {
    dispatch(
      addItem({
        prodId: productId,
        pricePoint: productPrice,
        maxQuantity,
      })
    );
  };

  const removeFromCart = (productId) => {
    dispatch(
      removeItem({
        prodId: productId,
      })
    );
  };

  const saveSaleHandler = (event) => {
    if (cart.length < 1) {
      dispatch(
        ephimeralNotification({
          status: "warning",
          message: "No se puede registrar una venta sin productos.",
        })
      );
    } else {
      setShowDialog(true);
    }
  };

  const confirmSaleHandler = async (event) => {
    try {
      dispatch(
        showNotification({
          status: "info",
          message: "Registrando la venta...",
        })
      );

      for (const product of cart) {
        const productRef = doc(firestore, "products", product.prodId);
        const productData = await getDoc(productRef);
        await updateDoc(productRef, {
          quantity: +productData.data().quantity - +product.quantity,
        });
      }

      await addDoc(salesCollectionRef, {
        employeeId: user.data.uid,
        saleDate: new Date(),
        total: +totalAmount,
        products: cart.map((cartProduct) => {
          return {
            productId: cartProduct.prodId,
            quantity: cartProduct.quantity,
            pricePoint: cartProduct.pricePoint,
          };
        }),
      });

      dispatch(resetCart());
      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Venta registrada con éxito.",
        })
      );
      history.push("/sales");
    } catch (error) {
      dispatch(
        ephimeralNotification({
          status: "error",
          message: "Ocurrió un problema al registrar la venta.",
        })
      );
    }
  };

  const actions = [
    {
      label: "Guardar registro",
      color: "info",
      icon: <Save />,
      onClick: saveSaleHandler,
    },
    {
      label: "Cancelar",
      color: "error",
      icon: <Cancel />,
      onClick: (event) => {
        dispatch(resetCart());
        history.push("/sales");
      },
    },
  ];

  let content;
  if (status === "loading") {
    content = (
      <Skeleton animation="wave" variant="rounded" height={45} width="100%" />
    );
  }

  if (status === "success") {
    content = productsData.map((p) => {
      let cartQuantity = 0;
      if (cart.length > 0) {
        const productInCart = cart.find((prod) => prod.prodId === p.id);
        if (productInCart) {
          cartQuantity = productInCart.quantity;
        }
      }

      return (
        <ListItem
          key={p.id}
          secondaryAction={
            <IconButton
              color="error"
              edge="end"
              onClick={removeFromCart.bind(null, p.id)}
            >
              <Remove />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton
            onClick={addToCart.bind(null, p.id, p.price, p.quantity)}
          >
            <ListItemIcon>
              <Add color="success" />
            </ListItemIcon>
            <ListItemText primary={p.title} />
            <Tooltip title="Cantidad a vender">
              <Chip
                color="success"
                variant={chipVariant}
                label={cartQuantity}
              />
            </Tooltip>
          </ListItemButton>
        </ListItem>
      );
    });
  }

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
        <CardContent>{content}</CardContent>
      </StyledCard>
      <Dialog open={showDialog} TransitionComponent={Transition}>
        <DialogTitle>Registrar venta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El total de la venta es ${totalAmount.toFixed(2)}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="success" onClick={confirmSaleHandler}>
            Confirmar
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => setShowDialog(false)}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaleForm;
