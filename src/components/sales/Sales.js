import { useHistory } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import ActionBar from "../ui/ActionBar";
import SalesList from "./SalesList";

const Sales = () => {
  const history = useHistory();

  const actions = [
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
      <ActionBar actions={actions} />
      <SalesList />
    </>
  );
};

export default Sales;
