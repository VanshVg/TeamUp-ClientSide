import { Helmet } from "react-helmet";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { customErrorInterface } from "../auth/Register";
import CreateTeam from "../../components/modals/CreateTeam";
import JoinTeam from "../../components/modals/JoinTeam";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import { setUserTeams } from "../../redux/actions/userTeams";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export interface teamInterface {
  id: number;
  name: string;
  description: string | null;
  code: string;
  members: number;
  banner_url: string;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface userTeamsInterface {
  id: number;
  team_id: number;
  user_id: number;
  role: "admin" | "member";
  created_at: Date;
  updated_at: Date;
  team: teamInterface;
}

const Dashboard = () => {
  const [isCreateTeam, setIsCreateTeam] = useState<boolean>(false);
  const [isJoinTeam, setIsJoinTeam] = useState<boolean>(false);
  const [dashboardError, setDashboardError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userTeams: userTeamsInterface[] = useSelector(
    (state: RootState) => state.teams.userTeams
  ) as userTeamsInterface[];

  const handleArchive = (id: number) => {
    Swal.fire({
      title: "Archive Confirmation",
      text: "Are sure you want to add this team to archives?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://192.168.10.72:4000/team/archive/${id}`,
            {},
            { withCredentials: true }
          )
          .then((resp) => {
            if (resp.data.success) {
              Swal.fire({
                title: "Added to archives",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                navigate("/dashboard");
              });
            }
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              navigate("/*");
            }
          });
      }
    });
  };

  const handleDeleteTeam = (id: number) => {
    Swal.fire({
      title: "Archive Confirmation",
      text: "Are sure you want to delete this team?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://192.168.10.72:4000/team/remove/${id}`, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              Swal.fire({
                title: "Team deleted successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                navigate("/dashboard");
              });
            }
          })
          .catch((error) => {
            if (error) {
              navigate("/*");
            }
          });
      }
    });
  };

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
        const { data } = error.response;
        setDashboardError({ type: data.type, message: data.message });
      });
  }, [CreateTeam, dispatch, handleArchive, handleDeleteTeam]);

  const handleCreateTeam = () => {
    setIsCreateTeam(true);
  };

  const handleJoinTeam = () => {
    setIsJoinTeam(true);
  };

  const openSubMenu = (e: MouseEvent<HTMLElement>) => {
    const divId: string =
      e.currentTarget.classList[e.currentTarget.classList.length - 1];
    (document.getElementById(divId) as HTMLElement).style.display = "block";
  };

  const closeSubMenu = (e: MouseEvent<HTMLElement>) => {
    const divId: string =
      e.currentTarget.classList[e.currentTarget.classList.length - 1];
    (document.getElementById(divId) as HTMLElement).style.display = "none";
  };

  return (
    <div className="h-screen">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[100px]">
            {dashboardError.type ? (
              <div>{dashboardError.message}</div>
            ) : (
              <div>
                {!userTeams || userTeams.length === 0 ? (
                  <div>
                    <img
                      src="/background/addTeam_bg.png"
                      className="mx-auto -mt-[40px]"
                      alt=""
                    ></img>
                    <div className="flex gap-[15px] justify-center">
                      <div
                        className="bg-blue p-[15px] border-[1px] border-blue text-white rounded-[8px] duration-300 ease-out hover:bg-white hover:text-blue cursor-pointer"
                        onClick={handleCreateTeam}
                      >
                        Create Team
                      </div>
                      <div
                        className="bg-white p-[15px] border-[1px] border-blue text-blue rounded-[8px] duration-300 ease-out hover:bg-blue hover:text-white cursor-pointer"
                        onClick={handleJoinTeam}
                      >
                        Join Team
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
                  </div>
                ) : (
                  <div className="p-[20px]">
                    <div className="flex flex-wrap mx-auto">
                      {userTeams &&
                        userTeams.map((element, index) => (
                          <div
                            className="w-[calc(100%/3)] p-[10px]"
                            key={index}
                          >
                            <div className="relative rounded-t-[8px]">
                              <img
                                src={`${element["team"]["banner_url"]}.jpg`}
                                className="rounded-t-[8px] w-full"
                                alt=""
                              ></img>
                              <Link to={`/team/${element["team"]["id"]}`}>
                                <h2 className="text-fontBlue absolute text-[25px] bottom-[2%] right-2 text-left hover:underline cursor-pointer">
                                  {element["team"]["name"].length > 13
                                    ? element["team"]["name"].slice(0, 13) +
                                      `...`
                                    : element["team"]["name"]}
                                </h2>
                              </Link>
                              <div>
                                <img
                                  src="/icons/three-dots.svg"
                                  className={`absolute right-0 top-1 cursor-pointer submenu${index}`}
                                  alt=""
                                  onMouseEnter={openSubMenu}
                                  onMouseLeave={closeSubMenu}
                                ></img>
                                <div
                                  className={`absolute bg-white z-50 -right-5 top-6 shadow-[2px_2px_2px_2px_gray] rounded-[8px] submenu${index}`}
                                  id={`submenu${index}`}
                                  style={{ display: "none" }}
                                  onMouseEnter={openSubMenu}
                                  onMouseLeave={closeSubMenu}
                                >
                                  <Link
                                    to={`/team/${element["team"]["id"]}/edit`}
                                  >
                                    <div className="flex hover:bg-gray px-[7px] py-[2px] pt-[5px] cursor-pointer rounded-tl-[8px] rounded-tr-[8px] ease-out duration-200">
                                      <img
                                        src="/icons/edit.svg"
                                        alt=""
                                        className="h-[18px]"
                                      ></img>
                                      <p className="text-left text-[15px] ml-[8px] -mt-[2px] text-fontBlue">
                                        Edit team
                                      </p>
                                    </div>
                                  </Link>
                                  <div
                                    className="flex hover:bg-gray px-[7px] py-[2px] pt-[5px] mt-[7px] cursor-pointer ease-out duration-200"
                                    onClick={() =>
                                      handleArchive(element["team"]["id"])
                                    }
                                  >
                                    <img
                                      src="/icons/archived-orange.svg"
                                      alt=""
                                      className="h-[18px]"
                                    ></img>
                                    <p className="text-left text-[15px] ml-[8px] -mt-[2px] text-fontBlue">
                                      Add to archives
                                    </p>
                                  </div>
                                  <div
                                    className="flex hover:bg-gray px-[7px] py-[2px] pt-[5px] mt-[7px] cursor-pointer rounded-bl-[8px] rounded-br-[8px]  ease-out duration-200"
                                    onClick={() =>
                                      handleDeleteTeam(element["team"]["id"])
                                    }
                                  >
                                    <img
                                      src="/icons/bin.svg"
                                      alt=""
                                      className="h-[18px]"
                                    ></img>
                                    <p className="text-left text-[15px] ml-[8px] -mt-[2px] text-fontBlue">
                                      Delete team
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-left border-[1px] border-[gray] rounded-b-[8px] -mt-[1px] h-[200px]">
                              <div className="mt-[5px] ml-[4px] h-[70%] text-fontBlue"></div>
                              <div className="h-[1px] bg-gray"></div>
                              <div className="pt-[6px] text-fontBlue"></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
