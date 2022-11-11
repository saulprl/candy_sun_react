import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
  },
  reducers: {
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
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

export const { showNotification, clearNotification } = uiSlice.actions;

export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;
