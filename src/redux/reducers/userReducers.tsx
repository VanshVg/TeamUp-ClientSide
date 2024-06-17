import { PayloadAction } from "@reduxjs/toolkit";
import { SET_USER } from "../types";
import { userInterface } from "../../components/UpdateProfile";

interface usersInterface {
  user: userInterface;
}

const initialState: usersInterface = {
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "",
  },
};

const usersReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
