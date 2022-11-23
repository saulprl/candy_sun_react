import { Route } from "react-router-dom";

import EmployeesFilters from "../../components/filters/EmployeeFilters";
import ProductFilters from "../../components/filters/ProductFilters";
import SaleFilters from "../../components/filters/SaleFilters";

const FiltersPage = () => {
  return (
    <>
      <Route
        path="/filters/employees"
        exact
        render={() => <EmployeesFilters />}
      />
      <Route path="/filters/products" exact render={() => <ProductFilters />} />
      <Route path="/filters/sales" exact render={() => <SaleFilters />} />
    </>
  );
};

export default FiltersPage;
