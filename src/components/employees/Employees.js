import { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

import ActionBar from "../ui/ActionBar";
import EmployeesList from "./EmployeesList";

const Employees = (props) => {
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
      label: "Buscar empleado",
      color: "info",
      icon: <SearchIcon />,
      onClick: searchActionHandler,
      hiddenElement: (
        <Input
          inputRef={searchInputRef}
          color="info"
          placeholder="Buscar empleado"
          onChange={searchChangeHandler}
          value={filter}
          sx={{ maxWidth: "90%" }}
        />
      ),
    },
    {
      label: "Registrar empleado",
      color: "primary",
      icon: <AddIcon />,
      onClick: (event) => history.push("/employees/add"),
    },
    {
      label: "Ordenamiento",
      color: "secondary",
      icon: <SortIcon />,
      onClick: (event) => history.push("/filters/employees"),
    },
    // {
    //   label: "Refrescar empleados",
    //   color: "secondary",
    //   icon: <RefreshIcon />,
    //   onClick: (event) => window.location.reload(false),
    // },
  ];

  return (
    <>
      <ActionBar actions={actions} showSearchBar={showSearchBar} />
      <EmployeesList searchFilter={filter} />
    </>
  );
};

export default Employees;
