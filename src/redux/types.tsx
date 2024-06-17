import { AppStore } from "./store";

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_TEAMS = "TOGGLE_TEAMS";
export const SET_USER_TEAMS = "SET_USER_TEAMS";
export const SET_USER = "SET_USER";

export type RootState = ReturnType<AppStore["getState"]>;
