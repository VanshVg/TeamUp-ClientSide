import { PayloadAction } from "@reduxjs/toolkit";
import { TOGGLE_SIDEBAR, TOGGLE_TEAMS } from "../types";

const initialState = {
  isSidebarOpen: false,
  isTeamsOpen: false,
};

const sideBarReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case TOGGLE_TEAMS:
      return {
        ...state,
        isTeamsOpen: !state.isTeamsOpen,
      };
    default:
      return state;
  }
};

export default sideBarReducer;
