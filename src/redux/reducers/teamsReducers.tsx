import { PayloadAction } from "@reduxjs/toolkit";
import { SET_USER_TEAMS } from "../types";

const initialState = {
  userTeams: [],
};

const teamsReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_USER_TEAMS:
      return {
        userTeams: action.payload,
      };
    default:
      return state;
  }
};

export default teamsReducer;
