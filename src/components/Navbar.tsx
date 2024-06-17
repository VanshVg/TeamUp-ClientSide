import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleTeams } from "../redux/actions/sidebarActions";
import { RootState } from "../redux/types";
import CreateTeam from "./modals/CreateTeam";
import { useEffect, useState } from "react";
import JoinTeam from "./modals/JoinTeam";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userInterface } from "./UpdateProfile";
import axios from "axios";
import UserProfile from "./modals/UserProfile";

const Navbar = () => {
  const [isCreateTeam, setIsCreateTeam] = useState<boolean>(false);
  const [isJoinTeam, setIsJoinTeam] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [userData, setUserData] = useState<userInterface>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/auth/profile`, { withCredentials: true })
      .then((resp) => {
        if (resp.data.success) {
          setUserData(resp.data.userData);
        }
      })
      .catch((error) => {
        if (!error.response.data.success) {
          navigate("/error");
        }
      });
  }, []);

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );
  const isTeamsOpen = useSelector(
    (state: RootState) => state.sidebar.isTeamsOpen
  );

  const dispatch = useDispatch();
  const location = useLocation();

  const handleCreateTeam = () => {
    setIsCreateTeam(true);
  };

  const handleJoinTeam = () => {
    setIsJoinTeam(true);
  };

  const handleProfile = () => {
    setIsProfile(true);
  };

  const handleMenu = () => {
    if (isSidebarOpen && isTeamsOpen) {
      dispatch(toggleTeams());
    }
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div className="flex dashboard-navbar justify-between px-[30px] mx-auto shadow-[1px_1px_1px_1px_gray] py-[10px] pb-[15px]">
        <div className="flex text-blue text-[40px] -ml-[10px] font-bold">
          <img
            src="/icons/menu.svg"
            className="h-[60px] mt-[2px] mr-[10px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[32px] p-[10px]"
            alt=""
            onClick={handleMenu}
          ></img>
          <Link to={"/dashboard"}>
            <p className="cursor-pointer">Team Up</p>
          </Link>
        </div>
        {location.pathname === "/dashboard" ? (
          <div className="flex justify-end gap-[25px] w-[500px] mt-[20px]">
            <div
              className="flex text-fontBlue text-[18px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[22px] px-[10px]"
              onClick={handleCreateTeam}
            >
              <img src="/icons/plus.svg" className="mt-[2px]" alt=""></img>
              <p className="ml-[5px] mt-[8px]">CreateTeam</p>
            </div>
            <div
              className="flex text-fontBlue text-[18px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[22px] px-[10px]"
              onClick={handleJoinTeam}
            >
              <img src="/icons/door.svg" className="mt-[2px]" alt=""></img>
              <p className="ml-[10px] mt-[8px]">JoinTeam</p>
            </div>
            <div
              className="flex text-fontBlue text-[18px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[22px] px-[10px]"
              onClick={handleProfile}
            >
              <img src="/icons/account.svg" alt=""></img>
              <p className="ml-[7px] mt-[8px]">{userData?.username}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end w-[500px] mt-[20px]">
            <div
              className="flex text-fontBlue text-[18px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[22px] px-[10px]"
              onClick={handleProfile}
            >
              <img src="/icons/account.svg" alt=""></img>
              <p className="ml-[7px] mt-[8px]">{userData?.username}</p>
            </div>
          </div>
        )}
      </div>
      <CreateTeam
        isOpen={isCreateTeam}
        onRequestClose={() => setIsCreateTeam(false)}
      />
      <JoinTeam
        isOpen={isJoinTeam}
        onRequestClose={() => setIsJoinTeam(false)}
      />
      <UserProfile
        isOpen={isProfile}
        isAdmin={true}
        role={"none"}
        onRequestClose={() => setIsProfile(false)}
        teamId={0}
        userId={userData?.id as number}
      />
    </>
  );
};

export default Navbar;
