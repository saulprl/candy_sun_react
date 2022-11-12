import { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import AvailableProducts from "./AvailableProducts";
import ActionBar from "../ui/ActionBar";

const Products = (props) => {
  const history = useHistory();
  const searchInputRef = useRef();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (showSearchBar) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

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
          inputRef={searchInputRef}
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
      color: "secondary",
      icon: <RefreshIcon />,
      onClick: (event) => window.location.reload(false),
    },
  ];

  return (
    <>
      <ActionBar actions={actions} showSearchBar={showSearchBar} />
      <AvailableProducts searchFilter={filter} />
    </>
  );
};

export default Products;
