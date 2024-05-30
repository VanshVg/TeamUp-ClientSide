import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../redux/types";
import { toggleSidebar, toggleTeams } from "../redux/actions/sidebarActions";

const Sidebar = () => {
  // const [myTeams, setMyTeams] = useState<boolean>(false);
  const isTeamsOpen = useSelector(
    (state: RootState) => state.sidebar.isTeamsOpen
  );
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  const location = useLocation();
  const dispatch = useDispatch();

  const handleMyTeams = (): void => {
    if (!isTeamsOpen && !isSidebarOpen) {
      dispatch(toggleSidebar());
    }
    dispatch(toggleTeams());
  };

  return (
    <>
      {isSidebarOpen ? (
        <div className="h-screen duration-300 ease-in shadow-[1px_1px_1px_1px_gray] w-[23%] pt-[15px] overflow-y-auto">
          <div
            className={`${
              location.pathname === "/dashboard"
                ? "mt-[5px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                : "mt-[5px] rounded-[12px] duration-300 ease-out -ml-[10px] py-[2px] cursor-pointer flex hover:bg-lightBg max-w-[95%]"
            }`}
          >
            <img src="/icons/home.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue">Home</p>
          </div>
          <div className="h-[1px] bg-[grey] mt-[15px] opacity-50 w-full"></div>
          <div className="mt-[15px] cursor-pointer">
            <div
              className="flex -ml-[10px] py-[2px] duration-300 ease-out rounded-[12px] hover:bg-lightBg max-w-[95%]"
              onClick={handleMyTeams}
            >
              {isTeamsOpen ? (
                <img src="/icons/down-arrow.svg" className="ml-[22px]" alt="" />
              ) : (
                <img
                  src="/icons/right-arrow.svg"
                  className="ml-[22px]"
                  alt=""
                />
              )}
              <img src="/icons/teams.svg" alt="" />
              <p className="ml-[15px] text-[18px] text-fontBlue">MyTeams</p>
            </div>
          </div>
          <div className="h-[1px] bg-[grey] mt-[15px] opacity-50 w-full"></div>
          <div
            className={`${
              location.pathname === "/settings"
                ? "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                : "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
            }`}
          >
            <img src="/icons/settings.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue">Settings</p>
          </div>
          <div className="mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]">
            <img src="/icons/exit.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue">Logout</p>
          </div>
        </div>
      ) : (
        <div className="h-screen duration-300 ease-in shadow-[1px_1px_1px_1px_gray] w-[7%] pt-[15px] overflow-y-auto">
          <div
            className={`${
              location.pathname === "/dashboard"
                ? "mt-[4px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                : "mt-[4px] rounded-[12px] duration-300 ease-out -ml-[10px] py-[4px] cursor-pointer flex hover:bg-lightBg max-w-[95%]"
            }`}
          >
            <img src="/icons/home.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue hidden">Home</p>
          </div>
          <div className="h-[1px] bg-[grey] mt-[14px] opacity-50 w-full"></div>
          <div className="mt-[14px] cursor-pointer">
            <div
              className="flex -ml-[10px] py-[4px] duration-300 ease-out rounded-[12px] hover:bg-lightBg max-w-[95%]"
              onClick={handleMyTeams}
            >
              {isTeamsOpen ? (
                <img src="/icons/down-arrow.svg" className="ml-[22px]" alt="" />
              ) : (
                <img
                  src="/icons/right-arrow.svg"
                  className="ml-[22px]"
                  alt=""
                />
              )}
              <img src="/icons/teams.svg" alt="" />
              <p className="ml-[15px] text-[18px] text-fontBlue hidden">
                MyTeams
              </p>
            </div>
          </div>
          <div className="h-[1px] bg-[grey] mt-[14px] opacity-50 w-full"></div>
          <div
            className={`${
              location.pathname === "/settings"
                ? "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                : "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
            }`}
          >
            <img src="/icons/settings.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue hidden">
              Settings
            </p>
          </div>
          <div className="mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]">
            <img src="/icons/exit.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue hidden">Logout</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
