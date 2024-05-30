import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "./reducers/sidebarReducers";

const rootReducer = combineReducers({
  sidebar: sideBarReducer,
});

const store = configureStore({ reducer: rootReducer });

export type AppStore = typeof store;

export default store;
