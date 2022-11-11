import { useState } from "react";
import { useSigninCheck } from "reactfire";
import { useHistory } from "react-router-dom";

import { Alert, Box, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import AvailableProducts from "./AvailableProducts";
import ActionBar from "../ui/ActionBar";

const Products = (props) => {
  const history = useHistory();
  const { status, data: signInCheckResult } = useSigninCheck();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filter, setFilter] = useState("");

  const searchActionHandler = (event) => {
    setShowSearchBar((prevState) => !prevState);
    setFilter("");
  };

  const searchChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  const actions = [
    {
      label: "Buscar producto",
      color: "info",
      icon: <SearchIcon />,
      onClick: searchActionHandler,
      hiddenElement: (
        <Input
          color="info"
          placeholder="Buscar producto"
          onChange={searchChangeHandler}
          value={filter}
          sx={{ maxWidth: "90%" }}
        />
      ),
    },
    {
      label: "Agregar producto",
      color: "primary",
      icon: <AddIcon />,
      onClick: (event) => history.push("/products/add"),
    },
    {
      label: "Refrescar productos",
      color: "success",
      icon: <RefreshIcon />,
      onClick: (event) => window.location.reload(false),
    },
  ];

  return (
    <>
      <ActionBar actions={actions} showSearchBar={showSearchBar} />
      {/* <ProductsSummary /> */}
      {status === "success" && !signInCheckResult.signedIn && (
        <Box
          sx={{
            margin: "auto",
            mt: "1.2rem",
            width: { xs: "90%", lg: "65%" },
          }}
        >
          <Alert severity="error">You are not authenticated!</Alert>
        </Box>
      )}
      {status === "loading" && (
        <Box
          sx={{
            margin: "auto",
            mt: "1.2rem",
            width: { xs: "90%", lg: "65%" },
          }}
        >
          <Alert severity="info">Authenticating...</Alert>
        </Box>
      )}
      {status === "success" && signInCheckResult.signedIn && (
        <>
          <AvailableProducts searchFilter={filter} />
        </>
      )}
    </>
  );
};

export default Products;
