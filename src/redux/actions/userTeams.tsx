import { userTeamsInterface } from "../../pages/dashboard/Dashboard";
import { SET_USER_TEAMS } from "../types";

export const setUserTeams = (userTeams: userTeamsInterface) => {
  return {
    type: SET_USER_TEAMS,
    payload: userTeams,
  };
};
