import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  ListItem,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";

const SaleProductItem = (props) => {
  const theme = useTheme();
  const firestore = useFirestore();
  const productRef = doc(firestore, "products", props.prodId);
  const { status, data } = useFirestoreDocDataOnce(productRef, {
    idField: "id",
  });

  const chipVariant = theme.palette.mode === "dark" ? "outlined" : "contained";

  let content;
  if (status === "loading") {
    content = (
      <Skeleton animation="wave" variant="rounded" width="100%" height={20} />
    );
  }

  if (status === "success") {
    content = (
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">{data.title}</Typography>
        <Tooltip title="Precio individual">
          <Chip
            variant={chipVariant}
            color="success"
            label={`$${props.price}`}
          />
        </Tooltip>
        <Tooltip title="Cantidad">
          <Chip
            variant={chipVariant}
            color="default"
            label={`x${props.quantity}`}
          />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          width: "95%",
          padding: { xs: "0.5rem", md: "0.5rem" },
          mr: 1,
          ml: 0,
          mt: 0,
          mb: 0,
        }}
      >
        {content}
      </Card>
    </Grid>
  );
};

export default SaleProductItem;
