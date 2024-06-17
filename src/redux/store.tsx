import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./reducers/sidebarReducers";
import teamsReducer from "./reducers/teamsReducers";
import usersReducer from "./reducers/userReducers";

const rootReducer = combineReducers({
  sidebar: sideBarReducer,
  teams: teamsReducer,
  user: usersReducer,
});

const store = configureStore({ reducer: rootReducer });

export type AppStore = typeof store;

export default store;
