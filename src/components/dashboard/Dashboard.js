import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { collection, limit, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

import { ephimeralNotification, showNotification } from "../../store/uiSlice";

import EmployeeItem from "../employees/employee-item/EmployeeItem";
import ProductItem from "../products/product-item/ProductItem";
import SaleItem from "../sales/sale-item/SaleItem";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const firestore = useFirestore();

  const productsColRef = collection(firestore, "products");
  const employeesColRef = collection(firestore, "users");
  const salesColRef = collection(firestore, "sales");

  const productsQuery = query(
    productsColRef,
    orderBy("quantity", "desc"),
    limit(1)
  );
  const employeesQuery = query(
    employeesColRef,
    orderBy("displayName", "desc"),
    limit(1)
  );
  const salesQuery = query(salesColRef, orderBy("saleDate", "desc"), limit(1));

  const { status: productStatus, data: productData } =
    useFirestoreCollectionData(productsQuery);
  const { status: employeeStatus, data: employeeData } =
    useFirestoreCollectionData(employeesQuery);
  const { status: saleStatus, data: saleData } =
    useFirestoreCollectionData(salesQuery);

  useEffect(() => {
    if (
      productStatus === "loading" ||
      employeeStatus === "loading" ||
      saleStatus === "loading"
    ) {
      dispatch(
        showNotification({
          status: "info",
          message: "Obteniendo datos...",
        })
      );
    } else {
      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Datos descargados.",
        })
      );
    }
  }, [dispatch, productStatus, employeeStatus, saleStatus]);

  return (
    <Grid container spacing={1} sx={{ position: "relative", mt: "-15rem" }}>
      <Grid item xs={12} md={6} lg={4}>
        <Card variant="outlined" sx={{ width: { xs: "90%" }, margin: "auto" }}>
          <CardContent>
            <Typography variant="h6">Productos</Typography>
            {productStatus === "loading" && (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={50}
              />
            )}
            {productStatus === "success" && (
              <ProductItem product={productData[0]} />
            )}
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={() => history.push("/products")}>
              Ver más
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card variant="outlined" sx={{ width: { xs: "90%" }, margin: "auto" }}>
          <CardContent>
            <Typography variant="h6">Empleados</Typography>
            {employeeStatus === "loading" && (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={50}
              />
            )}
            {employeeStatus === "success" && (
              <EmployeeItem employee={employeeData[0]} />
            )}
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={() => history.push("/employees")}>
              Ver más
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card variant="outlined" sx={{ width: { xs: "90%" }, margin: "auto" }}>
          <CardContent>
            <Typography variant="h6">Ventas</Typography>
            {saleStatus === "loading" && (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={50}
              />
            )}
            {saleStatus === "success" && <SaleItem sale={saleData[0]} />}
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={() => history.push("/sales")}>
              Ver más
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
