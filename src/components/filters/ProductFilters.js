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

import {
  changeProductsFilter,
  selectProductsFilter,
} from "../../store/filtersSlice";
import { ephimeralNotification } from "../../store/uiSlice";

import ActionBar from "../ui/ActionBar";
import StyledCard from "../ui/StyledCard";

const ProductFilters = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const productFilters = useSelector(selectProductsFilter);

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
      changeProductsFilter({
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

    history.push("/products");
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
      onClick: () => history.push("/products"),
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
              {/* <MenuItem value="title">Nombre</MenuItem>
              <MenuItem value="price">Precio</MenuItem>
              <MenuItem value="cost">Costo</MenuItem> */}
              <MenuItem value="quantity">Cantidad</MenuItem>
              {/* <MenuItem value="dateOfPurchase">Fecha de adquisición</MenuItem>
              <MenuItem value="expirationDate">Fecha de expiración</MenuItem> */}
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

export default ProductFilters;
