import { useDispatch } from "react-redux";
import { ephimeralNotification, showNotification } from "../../store/uiSlice";

import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import {
  CardContent,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import StyledCard from "../ui/StyledCard";
import ProductItem from "./product-item/ProductItem";
import { useEffect } from "react";

const ProductsList = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { searchFilter } = props;
  const productsCollection = collection(useFirestore(), "products");
  const productsQuery = query(productsCollection);
  const { status, data } = useFirestoreCollectionData(productsQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (status === "loading") {
      dispatch(
        showNotification({ status: "info", message: "Descargando datos..." })
      );
    }
    if (status === "success") {
      dispatch(
        ephimeralNotification({
          status: "success",
          message: "Datos descargados",
        })
      );
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <StyledCard
        sx={{
          width: { xs: "90%", lg: "70%" },
          position: "relative",
          margin: "auto",
          mt: "1rem",
          mb: "1rem",
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={60}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={60}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={60}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={60}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={60}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={60}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    );
  }

  if (status === "success") {
    const content = data
      .filter((p) => p.title.toLowerCase().includes(searchFilter.toLowerCase()))
      .map((p) => (
        <Grid item key={p.id} xs={12} sm={6} md={4}>
          <ProductItem product={p} />
        </Grid>
      ));

    return (
      <StyledCard
        sx={{
          width: { xs: "90%", lg: "70%" },
          position: "relative",
          mt: "1rem",
          mr: "auto",
          ml: "auto",
          mb: "1rem",
        }}
      >
        {isMobile && (
          <CardContent>
            <Grid container spacing={1}>
              {content}
            </Grid>
          </CardContent>
        )}
        {!isMobile && (
          <Grid container spacing={1}>
            {content}
          </Grid>
        )}
      </StyledCard>
    );
  }
};

export default ProductsList;
