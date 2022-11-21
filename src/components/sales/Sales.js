import { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ActionBar from "../ui/ActionBar";
import SalesList from "./SalesList";

const Sales = (props) => {
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
      label: "Buscar productos",
      color: "info",
      icon: <SearchIcon />,
      onClick: searchActionHandler,
      hiddenElement: (
        <Input
          inputRef={searchInputRef}
          color="info"
          placeholder="Buscar productos"
          onChange={searchChangeHandler}
          value={filter}
          sx={{ maxWidth: "90%" }}
        />
      ),
    },
    {
      label: "Registrar venta",
      color: "primary",
      icon: <AddIcon />,
      onClick: (event) => history.push("/sales/add"),
    },
    {
      label: "Refrescar ventas",
      color: "secondary",
      icon: <RefreshIcon />,
      onClick: (event) => window.location.reload(false),
    },
  ];

  return (
    <>
      <ActionBar actions={actions} showSearchBar={showSearchBar} />
      <SalesList searchFilter={filter} />
    </>
  );
};

export default Sales;
