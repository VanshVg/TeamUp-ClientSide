import { userInterface } from "../../components/UpdateProfile";
import { SET_USER } from "../types";

export const setUser = (user: userInterface) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
