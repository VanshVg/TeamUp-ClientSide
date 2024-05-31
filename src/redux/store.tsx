import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./reducers/sidebarReducers";
import teamsReducer from "./reducers/teamsReducers";

const rootReducer = combineReducers({
  sidebar: sideBarReducer,
  teams: teamsReducer,
});

const store = configureStore({ reducer: rootReducer });

export type AppStore = typeof store;

export default store;
