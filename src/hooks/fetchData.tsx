import axios from "axios";
import { useDispatch } from "react-redux";

export const fetchUserTeams = async () => {
  return await axios.get(`http://localhost:4000/team/userTeams`, {
    withCredentials: true,
  });
};
