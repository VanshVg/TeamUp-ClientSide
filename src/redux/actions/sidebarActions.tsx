import { TOGGLE_SIDEBAR, TOGGLE_TEAMS } from "../types";

export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};

export const toggleTeams = () => {
  return {
    type: TOGGLE_TEAMS,
  };
};
