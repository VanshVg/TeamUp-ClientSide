import axios from "axios";

export const fetchUserTeams = async () => {
  return await axios.get(`http://192.168.10.72:4000/team/userTeams`, {
    withCredentials: true,
  });
};
