import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customErrorInterface } from "../auth/Register";
import { teamInterface } from "../dashboard/Dashboard";
import { Snackbar, Tooltip } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from "sweetalert2";

const Team = () => {
  const [teamData, setTeamData] = useState<teamInterface>();
  const [teamError, setTeamError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [teamCode, setTeamCode] = useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleResetCode = (): void => {
    Swal.fire({
      title: "Reset Code Confirmation",
      text: "Are sure you want to reset your team code?",
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
            `http://192.168.10.72:4000/team/resetCode/${
              (teamData as teamInterface).id
            }`,
            {},
            { withCredentials: true }
          )
          .then((resp) => {
            if (resp.data.success) {
              Swal.fire({
                title: "Code Reset Successful",
                text: "Team code has been reset",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                setTeamCode(!teamCode);
              });
            }
          });
      }
    });
  };

  useEffect(() => {
    console.log("Inside");
    axios
      .get(`http://192.168.10.72:4000/team/get/${params.id}}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          setTeamData(resp.data.teamData);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.type === "server") {
          navigate("/*");
        } else if (!data.success) {
          setTeamError({ type: data.type, message: data.message });
        }
      });
  }, [params, teamCode]);

  const openSubMenu = (e: MouseEvent<HTMLElement>) => {
    (document.getElementById("submenu") as HTMLElement).style.display = "block";
  };

  const closeSubMenu = (e: MouseEvent<HTMLElement>) => {
    (document.getElementById("submenu") as HTMLElement).style.display = "none";
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

  return (
    <div className="h-screen">
      <Helmet>
        <title>{teamData?.name}</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] p-[15px] pt-[40px] pb-[100px] overflow-y-auto">
            <div className="relative w-[80%] mx-auto">
              <img
                src="/icons/three-dots.svg"
                className="absolute top-[2%] right-0 h-[35px] cursor-pointer"
                alt=""
                onMouseEnter={openSubMenu}
                onMouseLeave={closeSubMenu}
              ></img>
              <img
                src={`${teamData?.banner_url}.jpg`}
                className="mx-auto rounded-[8px] w-full"
                alt=""
              ></img>
              <h1 className="text-fontBlue font-bold text-[35px] absolute bottom-[2%] right-[2%]">
                {teamData?.name}
              </h1>
              <div
                className={`absolute bg-white z-50 -right-5 top-8 shadow-[2px_2px_2px_2px_gray] rounded-[8px]`}
                id={`submenu`}
                style={{ display: "none" }}
                onMouseEnter={openSubMenu}
                onMouseLeave={closeSubMenu}
              >
                <Link to={`/team/${teamData?.id}/edit`}>
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
                  className="flex hover:bg-gray px-[7px] py-[2px] pt-[5px] mt-[7px] cursor-pointer rounded-bl-[8px] rounded-br-[8px]  ease-out duration-200"
                  onClick={() =>
                    handleDeleteTeam((teamData as teamInterface).id)
                  }
                >
                  <img src="/icons/bin.svg" alt="" className="h-[18px]"></img>
                  <p className="text-left text-[15px] ml-[8px] -mt-[2px] text-fontBlue">
                    Delete team
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mt-[20px] w-[80%] mx-auto">
              <div className="w-[30%]">
                <div className="border-[1px] relative border-gray p-[10px] rounded-[5px]">
                  <div className="flex justify-between">
                    <p className="text-blue text-left">Team Code</p>
                    <Tooltip title="Reset Code">
                      <img
                        src="/icons/reset.svg"
                        className="cursor-pointer hover:bg-gray p-[8px] rounded-[22px] -mt-[8px]"
                        alt=""
                        onClick={handleResetCode}
                      ></img>
                    </Tooltip>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-left mt-[10px] text-[30px] text-fontBlue">
                      {teamData?.code}
                    </p>
                    <CopyToClipboard
                      text={teamData?.code as string}
                      onCopy={() => {
                        setOpenSnackbar(true);
                      }}
                    >
                      <Tooltip title="Copy Code">
                        <img
                          src="/icons/copy.svg"
                          alt=""
                          className="mt-[8px] hover:bg-gray p-[12px] rounded-[32px] cursor-pointer"
                        />
                      </Tooltip>
                    </CopyToClipboard>
                    <Snackbar
                      open={openSnackbar}
                      autoHideDuration={4000}
                      onClose={() => setOpenSnackbar(false)}
                      message="Team code copied to clipboard"
                    ></Snackbar>
                  </div>
                </div>
                <div className="border-[1px] border-gray p-[10px] mt-[30px] rounded-[5px]">
                  <p className="text-blue text-left">Team Members</p>
                  <div className="flex justify-between mt-[10px]">
                    <p className="text-left text-[30px] text-fontBlue">
                      {teamData?.members}
                    </p>
                    <p className="mt-auto mb-[8px] text-orange text-[13px] hover:underline cursor-pointer">
                      Show members
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full text-fontBlue border-[1px] border-gray ml-[30px] rounded-[5px]">
                <p>Content goes here..</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
