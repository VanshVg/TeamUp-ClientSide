import { AppStore } from "./store";

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export type RootState = ReturnType<AppStore["getState"]>;
