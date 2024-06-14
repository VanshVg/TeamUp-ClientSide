import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MouseEvent, useEffect, useState } from "react";
import { customErrorInterface } from "../auth/Register";
import { userTeamsInterface } from "./Dashboard";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

const ArchivedTeams = () => {
  const [archivesError, setArchivesError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });
  const [archivedTeams, setArchivedTeams] = useState<userTeamsInterface[]>([]);
  const [archive, setArchive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleArchive = (id: number) => {
    Swal.fire({
      title: "Archive Confirmation",
      text: "Are sure you want to remove this team from archives?",
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
              setArchive(!archive);
              Swal.fire({
                title: "Removed from archives",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                navigate("/archived");
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
    setIsLoading(true);
    axios
      .get(`http://192.168.10.72:4000/team/archivedTeams`, {
        withCredentials: true,
      })
      .then((resp) => {
        const { data } = resp;
        setArchivedTeams(data.archivedTeams);
      })
      .catch((error) => {
        const { data } = error.response;
        setArchivesError({ type: data.type, message: data.message });
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [archive]);

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
        <title>Archived Teams</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          {isLoading ? (
            <div className="mx-auto my-auto mt-[17%]">
              <Loader />
            </div>
          ) : (
            <div className="w-[93%] overflow-y-auto pb-[100px]">
              {archivesError.type ? (
                <div>{archivesError.message}</div>
              ) : (
                <div>
                  {archivedTeams.length === 0 ? (
                    <div>
                      <img
                        src="/background/addTeam_bg.png"
                        className="mx-auto -mt-[40px]"
                        alt=""
                      ></img>
                      <div className="flex gap-[15px] text-red text-[23px] justify-center">
                        There are no teams in archives
                      </div>
                    </div>
                  ) : (
                    <div className="p-[20px]">
                      <div className="flex flex-wrap mx-auto">
                        {archivedTeams &&
                          archivedTeams.map((element, index) => (
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
                                    <div
                                      className="flex hover:bg-gray px-[7px] pt-[7px] cursor-pointer rounded-[8px] ease-out duration-200"
                                      onClick={() =>
                                        handleArchive(element["team"]["id"])
                                      }
                                    >
                                      <img
                                        src="/icons/archived-out.svg"
                                        alt=""
                                        className="h-[18px]"
                                      ></img>
                                      <p className="text-left text-[15px] ml-[8px] -mt-[2px] text-fontBlue">
                                        Remove from archives
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivedTeams;
