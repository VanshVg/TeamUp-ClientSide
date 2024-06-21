import { createSlice } from "@reduxjs/toolkit";
import { userInterface } from "../../components/UpdateProfile";

const initialState: userInterface = {
  id: 0,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  role: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { setUser } = usersSlice.actions;
