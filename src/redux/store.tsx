import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "./reducers/sidebarReducers";
import { teamsReducer } from "./reducers/teamsReducers";
import { usersReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  teams: teamsReducer,
  user: usersReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

export default store;
