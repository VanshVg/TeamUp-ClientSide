import { PayloadAction } from "@reduxjs/toolkit";
import { SET_USER_TEAMS } from "../types";
import { userTeamsInterface } from "../../pages/dashboard/Dashboard";

interface teamsInterface {
  userTeams: userTeamsInterface[];
}

const initialState: teamsInterface = {
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
