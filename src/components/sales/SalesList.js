import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";

import {
  CardContent,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { ephimeralNotification, showNotification } from "../../store/uiSlice";

import SaleItem from "./sale-item/SaleItem";

import StyledCard from "../ui/StyledCard";

const SalesList = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const { searchFilter } = props;
  const salesCollection = collection(firestore, "sales");
  const salesQuery = query(salesCollection, orderBy("saleDate", "desc"));
  const { status, data } = useFirestoreCollectionData(salesQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (status === "loading") {
      dispatch(
        showNotification({
          status: "info",
          message: "Descargando datos...",
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
    const content = data.map((s) => (
      <Grid item key={s.id} xs={12} sm={6} md={4}>
        <SaleItem sale={s} />
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

export default SalesList;
