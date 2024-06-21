import { createSlice } from "@reduxjs/toolkit";
import { userTeamsInterface } from "../../pages/dashboard/Dashboard";

interface teamsInterface {
  userTeams: userTeamsInterface[];
}

const initialState: teamsInterface = {
  userTeams: [],
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setUserTeams(state, action) {
      state.userTeams = action.payload;
    },
  },
});

export const teamsReducer = teamSlice.reducer;
export const { setUserTeams } = teamSlice.actions;
