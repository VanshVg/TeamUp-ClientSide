import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleTeams } from "../redux/actions/sidebarActions";
import { RootState } from "../redux/types";
import CreateTeam from "./modals/CreateTeam";
import { useState } from "react";
import JoinTeam from "./modals/JoinTeam";

const Navbar = () => {
  const [isCreateTeam, setIsCreateTeam] = useState<boolean>(false);
  const [isJoinTeam, setIsJoinTeam] = useState<boolean>(false);

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );
  const isTeamsOpen = useSelector(
    (state: RootState) => state.sidebar.isTeamsOpen
  );

  const dispatch = useDispatch();

  const handleCreateTeam = () => {
    setIsCreateTeam(true);
  };

  const handleJoinTeam = () => {
    setIsJoinTeam(true);
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
          <p className="cursor-pointer">Team Up</p>
        </div>
        <div className="flex justify-around w-[500px] mt-[20px]">
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
          <div className="flex text-fontBlue text-[18px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[22px] px-[10px]">
            <img src="/icons/account.svg" className="mt-[2px]" alt=""></img>
            <p className="ml-[7px] mt-[8px]">Profile</p>
          </div>
        </div>
      </div>
      <CreateTeam
        isOpen={isCreateTeam}
        onRequestClose={() => setIsCreateTeam(false)}
      />
      <JoinTeam
        isOpen={isJoinTeam}
        onRequestClose={() => setIsJoinTeam(false)}
      />
    </>
  );
};

export default Navbar;
