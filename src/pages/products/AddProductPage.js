import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductsForm from "../../components/products/ProductsForm";
import { setTitle } from "../../store/uiSlice";

const AddProductPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Agregar producto"));
  }, [dispatch]);

  return <ProductsForm />;
};

export default AddProductPage;
