import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./uiSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
  },
});
