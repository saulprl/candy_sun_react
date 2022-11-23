import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ephimeralNotification, showNotification } from "../../store/uiSlice";

import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import {
  CardContent,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EmployeeItem from "./employee-item/EmployeeItem";
import StyledCard from "../ui/StyledCard";
import { selectEmployeesFilter } from "../../store/filtersSlice";

const EmployeesList = (props) => {
  const { searchFilter } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const employeesFilter = useSelector(selectEmployeesFilter);

  const firestore = useFirestore();
  const employeesCollection = collection(firestore, "users");
  const employeesQuery = query(
    employeesCollection,
    orderBy(employeesFilter.field, employeesFilter.order)
  );
  const { status, data } = useFirestoreCollectionData(employeesQuery, {
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
    const content = data
      .filter((emp) =>
        emp.displayName.toLowerCase().includes(searchFilter.toLowerCase())
      )
      .map((emp) => (
        <Grid item key={emp.id} xs={12} sm={6} md={4}>
          <EmployeeItem employee={emp} />
        </Grid>
      ));

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

export default EmployeesList;
