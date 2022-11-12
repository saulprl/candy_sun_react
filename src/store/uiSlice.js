import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    headerTitle: "Inicio",
    notification: null,
    themeMode: "dark",
  },
  reducers: {
    setTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
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

export const { setTitle, toggleTheme, showNotification, clearNotification } =
  uiSlice.actions;

export const selectHeaderTitle = (state) => state.ui.headerTitle;
export const selectNotification = (state) => state.ui.notification;
export const selectThemeMode = (state) => state.ui.themeMode;

export default uiSlice.reducer;
