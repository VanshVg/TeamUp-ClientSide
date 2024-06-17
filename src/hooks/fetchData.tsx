import axios from "axios";

export const fetchUserTeams = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/team/userTeams`,
    {
      withCredentials: true,
    }
  );
};
