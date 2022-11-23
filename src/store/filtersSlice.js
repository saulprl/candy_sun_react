import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    products: { field: "quantity", order: "desc" },
    employees: { field: "displayName", order: "desc" },
    sales: { field: "saleDate", order: "desc" },
  },
  reducers: {
    resetFilters: (state) => {
      state.products = { field: "quantity", order: "desc" };
      state.employees = { field: "displayName", order: "desc" };
      state.sales = { field: "saleDate", order: "desc" };
    },
    changeProductsFilter: (state, action) => {
      state.products = { ...action.payload };
    },
    changeEmployeesFilter: (state, action) => {
      state.employees = { ...action.payload };
    },
    changeSalesFilter: (state, action) => {
      state.sales = { ...action.payload };
    },
  },
});

export const {
  resetFilters,
  changeEmployeesFilter,
  changeProductsFilter,
  changeSalesFilter,
} = filtersSlice.actions;

export const selectProductsFilter = (state) => state.filters.products;
export const selectEmployeesFilter = (state) => state.filters.employees;
export const selectSalesFilter = (state) => state.filters.sales;

export default filtersSlice.reducer;
