import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { CardContent, Grid, Skeleton, Stack } from "@mui/material";

import StyledCard from "../ui/StyledCard";
import ProductItem from "./product-item/ProductItem";

const AvailableProducts = (props) => {
  const { searchFilter } = props;
  const productsCollection = collection(useFirestore(), "products");
  const productsQuery = query(productsCollection);
  const { status, data } = useFirestoreCollectionData(productsQuery, {
    idField: "id",
  });
  let content;
  if (status === "loading") {
    content = (
      <Stack spacing={1.5}>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ width: "100%" }}
          height={60}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ width: "100%" }}
          height={60}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ width: "100%" }}
          height={60}
        />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
      </Stack>
    );
  } else if (status === "success") {
    if (searchFilter !== "") {
      content = data
        .filter((p) =>
          p.title.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .map((p) => <ProductItem key={p.id} product={p} />);
    } else {
      content = data.map((p) => (
        <Grid item key={p.id} xs={12} sm={6} md={4}>
          <ProductItem product={p} />
        </Grid>
      ));
    }
  }

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
      {status === "loading" && <CardContent>{content}</CardContent>}
      {status === "success" && (
        <CardContent sx={{ display: { sm: "none" } }}>
          <Grid container spacing={1}>
            {content}
          </Grid>
        </CardContent>
      )}
      {status === "success" && (
        <Grid
          container
          spacing={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {content}
        </Grid>
      )}
    </StyledCard>
  );
};

export default AvailableProducts;
