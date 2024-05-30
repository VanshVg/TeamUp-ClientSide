import { AppStore } from "./store";

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_TEAMS = "TOGGLE_TEAMS";

export type RootState = ReturnType<AppStore["getState"]>;
