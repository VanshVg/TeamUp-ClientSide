import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [myTeams, setMyTeams] = useState<boolean>(false);

  const location = useLocation();

  const handleMyTeams = (): void => {
    setMyTeams(!myTeams);
  };

  return (
    <div className="h-[100%] shadow-[1px_1px_1px_1px_gray] pt-[15px] max-w-[300px] overflow-y-auto">
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
          {myTeams ? (
            <img src="/icons/down-arrow.svg" className="ml-[22px]" alt="" />
          ) : (
            <img src="/icons/right-arrow.svg" className="ml-[22px]" alt="" />
          )}
          <img src="/icons/teams.svg" alt="" />
          <p className="ml-[15px] text-[18px] text-fontBlue">My Teams</p>
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
  );
};

export default Sidebar;
