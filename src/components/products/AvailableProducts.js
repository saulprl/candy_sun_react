// import { useState, useEffect, useCallback } from "react";
import { CardContent, List, Skeleton, Stack } from "@mui/material";
import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import StyledCard from "../ui/StyledCard";
import ProductItem from "./product-item/ProductItem";

const AvailableProducts = (props) => {
  const productsCollection = collection(useFirestore(), "products");
  // console.log(productsRef);
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
    content = data.map((p) => <ProductItem key={p.id} product={p} />);
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
      <CardContent>
        <List>{content}</List>
      </CardContent>
    </StyledCard>
  );
};

export default AvailableProducts;
