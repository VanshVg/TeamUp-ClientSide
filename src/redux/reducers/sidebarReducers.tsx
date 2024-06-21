import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  isTeamsOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleTeams(state) {
      state.isTeamsOpen = !state.isTeamsOpen;
    },
  },
});

export const sidebarReducer = sidebarSlice.reducer;
export const { toggleSidebar, toggleTeams } = sidebarSlice.actions;
