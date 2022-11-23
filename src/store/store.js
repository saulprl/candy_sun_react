import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./uiSlice";
import cartReducer from "./cartSlice";
import filtersReducer from "./filtersSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    filters: filtersReducer,
  },
});
