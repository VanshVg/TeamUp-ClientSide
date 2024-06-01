import { MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/types";
import { toggleSidebar, toggleTeams } from "../redux/actions/sidebarActions";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { setUserTeams } from "../redux/actions/userTeams";
import { userTeamsInterface } from "../pages/dashboard/Dashboard";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const Sidebar = () => {
  const isTeamsOpen = useSelector(
    (state: RootState) => state.sidebar.isTeamsOpen
  );
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );
  const userTeams: userTeamsInterface[] = useSelector(
    (state: RootState) => state.teams.userTeams
  ) as userTeamsInterface[];

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookies: Cookies = new Cookies();

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/team/userTeams`, {
        withCredentials: true,
      })
      .then((resp) => {
        const { data } = resp;
        dispatch(setUserTeams(data.userTeams));
      })
      .catch((error) => {
        navigate("/*");
      });
  }, [dispatch]);

  const handleMyTeams = (): void => {
    if (!isTeamsOpen && !isSidebarOpen) {
      dispatch(toggleSidebar());
    }
    dispatch(toggleTeams());
  };

  const handleTeam = (url: string): void => {
    navigate(url);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are sure you want to logout?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          cookies.remove("token");
          Swal.fire({
            title: "Logout Successful",
            text: "Logout Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch(() => {
        navigate("/*");
      });
  };

  return (
    <>
      {isSidebarOpen ? (
        <div className="h-screen duration-300 ease-in shadow-[1px_1px_1px_1px_gray] w-[23%] pt-[15px] pb-[110px] overflow-y-auto">
          <Link to={"/dashboard"}>
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
          </Link>
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
              <p className="ml-[15px] text-[18px] text-fontBlue">
                {" "}
                <span className="mr-[5px]">My</span>Teams
              </p>
            </div>
            <div className="mt-[10px]">
              {userTeams.length < 1 && isTeamsOpen ? (
                <div>
                  <p className="text-red">There are no teams...</p>
                </div>
              ) : (
                <>
                  {isTeamsOpen &&
                    userTeams &&
                    userTeams.map((element, index) => (
                      <div
                        className={
                          location.pathname !== `/team/${element["team"]["id"]}`
                            ? `${"flex hover:bg-lightBg w-[93%] mt-[5px] duration-300 ease-out rounded-[12px] py-[5px] -ml-[10px]"}`
                            : `${"flex bg-skyBlue w-[93%] mt-[5px] duration-300 ease-out rounded-[12px] py-[5px] -ml-[10px]"}`
                        }
                        onClick={() =>
                          handleTeam(`/team/${element["team"]["id"]}`)
                        }
                        key={index}
                      >
                        <div className="h-[25px] ml-[45px] pt-[1px] bg-blue  w-[25px] rounded-[32px] text-white text-[16px]">
                          {element["team"]["name"][0].toUpperCase()}
                        </div>
                        <p className="ml-[22px] text-fontBlue">
                          {element["team"]["name"].length > 13
                            ? element["team"]["name"].slice(0, 13) + `...`
                            : element["team"]["name"]}
                        </p>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
          <div className="h-[1px] bg-[grey] mt-[15px] opacity-50 w-full"></div>
          <Link to={"/archived"}>
            <div
              className={`${
                location.pathname === "/archived"
                  ? "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                  : "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
              }`}
            >
              <img src="/icons/archived.svg" className="ml-[45px]" alt="" />
              <p className="ml-[15px] text-[18px] text-fontBlue">
                <span className="mr-[5px]">Archived</span>Teams
              </p>
            </div>
          </Link>
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
          <div
            className="mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
            onClick={handleLogout}
          >
            <img src="/icons/exit.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-fontBlue">Logout</p>
          </div>
        </div>
      ) : (
        <div className="h-screen duration-300 ease-in shadow-[1px_1px_1px_1px_gray] w-[7%] pt-[15px] overflow-y-auto">
          <Link to={"/dashboard"}>
            <Tooltip title="Home">
              <div
                className={`${
                  location.pathname === "/dashboard"
                    ? "mt-[4px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                    : "mt-[4px] rounded-[12px] duration-300 ease-out -ml-[10px] py-[4px] cursor-pointer flex hover:bg-lightBg max-w-[95%]"
                }`}
              >
                <img src="/icons/home.svg" className="ml-[45px]" alt="" />
                <p className="ml-[15px] text-[18px] text-fontBlue hidden">
                  Home
                </p>
              </div>
            </Tooltip>
          </Link>
          <div className="h-[1px] bg-[grey] mt-[14px] opacity-50 w-full"></div>
          <div className="mt-[14px] cursor-pointer">
            <Tooltip title="My Teams">
              <div
                className="flex -ml-[10px] py-[4px] duration-300 ease-out rounded-[12px] hover:bg-lightBg max-w-[95%]"
                onClick={handleMyTeams}
              >
                {isTeamsOpen ? (
                  <img
                    src="/icons/down-arrow.svg"
                    className="ml-[22px]"
                    alt=""
                  />
                ) : (
                  <img
                    src="/icons/right-arrow.svg"
                    className="ml-[22px]"
                    alt=""
                  />
                )}
                <img src="/icons/teams.svg" alt="" />
              </div>
            </Tooltip>
          </div>
          <div className="h-[1px] bg-[grey] mt-[14px] opacity-50 w-full"></div>
          <Link to={"/archived"}>
            <Tooltip title="Archived Teams">
              <div
                className={`${
                  location.pathname === "/archived"
                    ? "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                    : "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
                }`}
              >
                <img src="/icons/archived.svg" className="ml-[45px]" alt="" />
              </div>
            </Tooltip>
          </Link>
          <Tooltip title="Settings">
            <div
              className={`${
                location.pathname === "/settings"
                  ? "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                  : "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
              }`}
            >
              <img src="/icons/settings.svg" className="ml-[45px]" alt="" />
            </div>
          </Tooltip>
          <Tooltip title="Logout">
            <div
              className="mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
              onClick={handleLogout}
            >
              <img src="/icons/exit.svg" className="ml-[45px]" alt="" />
            </div>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Sidebar;
