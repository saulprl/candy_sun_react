import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    headerTitle: "Inicio",
    notification: null,
  },
  reducers: {
    setTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const ephimeralNotification = (notificationData) => (dispatch) => {
  setTimeout(() => {
    dispatch(clearNotification());
  }, 3000);

  dispatch(showNotification(notificationData));
};

export const { setTitle, showNotification, clearNotification } =
  uiSlice.actions;

export const selectHeaderTitle = (state) => state.ui.headerTitle;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;
