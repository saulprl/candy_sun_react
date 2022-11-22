import { Route } from "react-router-dom";

const FiltersPage = () => {
  return (
    <>
      <Route path="/filters/employees" exact />
      <Route path="/filters/products" exact />
      <Route path="/filters/sales" exact />
    </>
  );
};

export default FiltersPage;
