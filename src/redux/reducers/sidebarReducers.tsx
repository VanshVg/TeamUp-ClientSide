import { PayloadAction } from "@reduxjs/toolkit";
import { TOGGLE_SIDEBAR } from "../types";

const initialState = {
  isSidebarOpen: false,
};

const sideBarReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export default sideBarReducer;
