import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";

import { changeSalesFilter, selectSalesFilter } from "../../store/filtersSlice";
import { ephimeralNotification } from "../../store/uiSlice";

import ActionBar from "../ui/ActionBar";
import StyledCard from "../ui/StyledCard";

const SaleFilters = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const productFilters = useSelector(selectSalesFilter);

  const [selectValue, setSelectValue] = useState("");
  const [ascending, setAscending] = useState(false);

  const selectChangeHandler = (event) => {
    setSelectValue(event.target.value);
  };

  const toggleAscending = (event) => {
    setAscending((prevState) => !prevState);
  };

  const saveFiltersHandler = (event) => {
    dispatch(
      changeSalesFilter({
        field: selectValue,
        order: ascending ? "asc" : "desc",
      })
    );

    dispatch(
      ephimeralNotification({
        status: "success",
        message: "Filtro de productos actualizado.",
      })
    );

    history.push("/sales");
  };

  const actions = [
    {
      label: "Guardar filtros",
      color: "info",
      icon: <Save />,
      onClick: saveFiltersHandler,
    },
    {
      label: "Cancelar",
      color: "error",
      icon: <Cancel />,
      onClick: () => history.push("/sales"),
    },
  ];

  return (
    <>
      <ActionBar actions={actions} />
      <StyledCard
        sx={{
          position: "relative",
          width: { xs: "90%", lg: "70%" },
          mt: "1rem",
          ml: "auto",
          mb: "1rem",
          mr: "auto",
        }}
      >
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="field-label">Campo</InputLabel>
            <Select
              labelId="field-label"
              id="field-select"
              defaultValue={productFilters.field}
              value={selectValue}
              onChange={selectChangeHandler}
            >
              <MenuItem value="total">Monto total</MenuItem>
              <MenuItem value="saleDate">Fecha de la venta</MenuItem>
            </Select>
          </FormControl>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleAscending} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={ascending} />
              </ListItemIcon>
              <ListItemText primary="Ascendente" />
            </ListItemButton>
          </ListItem>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default SaleFilters;
