import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

import { CircularProgress } from "@mui/material";

import {
  ephimeralNotification,
  setTitle,
  showNotification,
} from "../../store/uiSlice";

import ProductsForm from "../../components/products/ProductsForm";

const EditProductPage = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const productRef = doc(firestore, "products", params.productId);
  const { status, data: product } = useFirestoreDocData(productRef);

  useEffect(() => {
    if (status === "loading") {
      dispatch(
        showNotification({
          status: "info",
          message: "Cargando datos del producto...",
        })
      );
    }
    if (status === "success") {
      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Datos descargados.",
        })
      );
      dispatch(setTitle("Editar producto"));
    }
  }, [status, dispatch]);

  return (
    <>
      {status === "loading" && <CircularProgress />}
      {status === "success" && (
        <ProductsForm product={product} productRef={productRef} />
      )}
    </>
  );
};

export default EditProductPage;
